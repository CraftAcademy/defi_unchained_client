describe('displays info about crypto coins', () => {
  describe('successfully', () => {
    beforeEach(() => {
      cy.server()
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/markets?*",
        response: 'fixture:market_cap.json',
      })
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/markets?*",
        response: 'fixture:currencies.json',
      })
      cy.visit('/')
    })
    
    it('should display 6 cards', () => {
      cy.find('[data-cy="crypto-card"]').should('have.length', 4)
    })

    it('a card should display the correct information', () => {
      cy.get('[data-cy="crypto-card"]').within(() => {
        cy.get('[data-cy="crypto-header"]').should('contain', 'Bitcoin')
        cy.get('[data-cy="crypto-logo"]').should('be.visible')
        cy.get('[data-cy="crypto-price"]').should('contain', '$49070.3')
        cy.get('[data-cy="crypto-change"]').should('contain', '2.71%')
      })
    })
  })
})