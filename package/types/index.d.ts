import { PluginFunction } from 'vue'

export interface SimplePortalOptions {
  name?: string
}

export interface SimplePortalConfig {
  selector: string
}

export var config: Readonly<SimplePortalConfig>
export var setSelector: <T extends string>(selector: T) => T
export var Portal: any

var install: PluginFunction<SimplePortalOptions>
export default install
