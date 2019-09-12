
/**
 * vue-simple-portal
 * version: 0.1.4,
 * (c) Thorsten Lünborg, 2019
 * LICENCE: Apache-2.0
 * http://github.com/linusborg/vue-simple-portal
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
  (global = global || self, factory(global.VueSimplePortal = {}, global.Vue));
}(this, function (exports, Vue) { 'use strict';

  Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue;

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  var url = 'bjectSymhasOwnProp-0123456789ABCDEFGHIJKLMNQRTUVWXYZ_dfgiklquvxz';

  /**
   * Generate URL-friendly unique ID. This method use non-secure predictable
   * random generator.
   *
   * By default, ID will have 21 symbols to have a collision probability similar
   * to UUID v4.
   *
   * @param {number} [size=21] The number of symbols in ID.
   *
   * @return {string} Random string.
   *
   * @example
   * const nanoid = require('nanoid/non-secure')
   * model.id = nanoid() //=> "Uakgb_J5m9g-0JDMbcJqL"
   *
   * @name nonSecure
   * @function
   */
  var nonSecure = function (size) {
    size = size || 21;
    var id = '';
    while (0 < size--) {
      id += url[Math.random() * 64 | 0];
    }
    return id
  };

  var config = {
    selector: "vue-portal-target-".concat(nonSecure())
  };
  var setSelector = function setSelector(selector) {
    return config.selector = selector;
  };
  var isBrowser = typeof window !== 'undefined' && (typeof document === "undefined" ? "undefined" : _typeof(document)) !== undefined;

  var TargetContainer = Vue.extend({
    // as an abstract component, it doesn't appear in
    // the $parent chain of components.
    // which means the next parent of any component rendered inside of this oen
    // will be the parent from which is was portal'd
    abstract: true,
    name: 'PortalOutlet',
    props: ['nodes', 'tag'],
    data: function data(vm) {
      return {
        updatedNodes: vm.nodes
      };
    },
    render: function render(h) {
      var nodes = this.updatedNodes && this.updatedNodes();
      if (!nodes) return h();
      return nodes.length < 2 && !nodes[0].text ? nodes : h(this.tag || 'DIV', nodes);
    },
    destroyed: function destroyed() {
      var el = this.$el;
      el.parentNode.removeChild(el);
    }
  });

  var Portal = Vue.extend({
    name: 'VueSimplePortal',
    props: {
      disabled: {
        type: Boolean
      },
      prepend: {
        type: Boolean
      },
      selector: {
        type: String,
        default: function _default() {
          return "#".concat(config.selector);
        }
      },
      tag: {
        type: String,
        default: 'DIV'
      }
    },
    render: function render(h) {
      if (this.disabled) {
        var nodes = this.$scopedSlots && this.$scopedSlots.default();
        if (!nodes) return h();
        return nodes.length < 2 && !nodes[0].text ? nodes : h(this.tag, nodes);
      }

      return h();
    },
    created: function created() {
      if (!this.getTargetEl()) {
        this.insertTargetEl();
      }
    },
    updated: function updated() {
      var _this = this;

      // We only update the target container component
      // if the scoped slot function is a fresh one
      // The new slot syntax (since Vue 2.6) can cache unchanged slot functions
      // and we want to respect that here.
      this.$nextTick(function () {
        if (!_this.disabled && _this.slotFn !== _this.$scopedSlots.default) {
          _this.container.updatedNodes = _this.$scopedSlots.default;
        }

        _this.slotFn = _this.$scopedSlots.default;
      });
    },
    beforeDestroy: function beforeDestroy() {
      this.unmount();
    },
    watch: {
      disabled: {
        immediate: true,
        handler: function handler(disabled) {
          disabled ? this.unmount() : this.$nextTick(this.mount);
        }
      }
    },
    methods: {
      // This returns the element into which the content should be mounted.
      getTargetEl: function getTargetEl() {
        if (!isBrowser) return;
        return document.querySelector(this.selector);
      },
      insertTargetEl: function insertTargetEl() {
        if (!isBrowser) return;
        var parent = document.querySelector('body');
        var child = document.createElement(this.tag);
        child.id = this.selector.substring(1);
        parent.appendChild(child);
      },
      mount: function mount() {
        var targetEl = this.getTargetEl();
        var el = document.createElement('DIV');

        if (this.prepend && targetEl.firstChild) {
          targetEl.insertBefore(el, targetEl.firstChild);
        } else {
          targetEl.appendChild(el);
        }

        this.container = new TargetContainer({
          el: el,
          parent: this,
          propsData: {
            tag: this.tag,
            nodes: this.$scopedSlots.default
          }
        });
      },
      unmount: function unmount() {
        if (this.container) {
          this.container.$destroy();
          delete this.container;
        }
      }
    }
  });

  function install(_Vue) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _Vue.component(options.name || 'portal', Portal);

    if (options.defaultSelector) {
      setSelector(options.defaultSelector);
    }
  }

  if (typeof window !== 'undefined' && window.Vue && window.Vue === Vue) {
    // plugin was inlcuded directly in a browser
    Vue.use(install);
  }

  exports.Portal = Portal;
  exports.config = config;
  exports.default = install;
  exports.setSelector = setSelector;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
