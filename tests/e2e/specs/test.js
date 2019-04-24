// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('renders initial page', () => {
    cy.visit('/')
    cy.contains('h1', 'Welcome to Your Vue.js App')
  })

  it('mounts a bare portal correctly', () => {
    cy.visit('/')
    const selector = cy.window().PortalSelector
    cy.get(selector).should.have.descendants('[data-test="test-header"]')
  })
})
