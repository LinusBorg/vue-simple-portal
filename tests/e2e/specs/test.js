// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('renders initial page', () => {
    cy.visit('/')
    cy.contains('h1', 'Demo App for VueSimplePortal')
  })

  it('mounts a bare portal correctly', () => {
    cy.visit('/')
    cy.portalTarget().then(el => {
      expect(el).to.not.be.undefined
      expect(el).to.have.descendants('[data-test="test-header"]')
    })
  })

  it('renders in place when disabled', () => {
    cy.visit('/disable')
    cy.portalTarget()
      .then(el => {
        expect(el).to.not.be.undefined
        expect(el).to.not.have.descendants('[data-test="test-header"]')
        return cy.get('#content')
      })
      .then(content => {
        expect(content).to.have.descendants('[data-test="test-header"]')
      })
  })
  it('handles transitions', function() {
    cy.visit('/transition')
    cy.portalTarget()
      .as('el')
      .then(el => {
        expect(el).to.not.be.undefined
        expect(el).to.not.have.descendants('[data-test="test-header"]')

        cy.get('#toggle-button').click()
        return cy.wait(500)
      })
      .then(() => {
        expect(this.el).to.have.descendants('[data-test="test-header"]')

        cy.get('#toggle-button').click()
        return cy.wait(700)
      })
      .then(() => {
        expect(this.el).to.not.have.descendants('[data-test="test-header"]')
      })
  })
  it('works with multiple portals sending content', function() {
    cy.visit('/multiple')
    cy.portalTarget()
      .as('el')
      .then(el => {
        const children = el.children()
        expect(children.length).to.equal(2)
        expect(children[0]).to.have.data('test', 'multiple-p')
        expect(children[1]).to.have.descendants('[data-test="test-header"]')
      })
  })
  it('works with a custom target', function() {
    cy.visit('/custom-target')
    cy.get('#custom-target')
      .as('ct')
      .should('exist')
      .then(ct => {
        expect(ct).to.have.descendants('[data-test="test-header"]')
      })
  })
})
