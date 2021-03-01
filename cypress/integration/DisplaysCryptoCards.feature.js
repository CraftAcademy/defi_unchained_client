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
        url: "http://localhost:3000/api/currencies",
        response: 'fixture:currencies.json',
      })
      cy.visit('/')
     
    })
    
    it('should display 6 cards', () => {
      cy.get('[data-cy="crypto-cards"]').find('[data-cy="crypto-card"]').should('have.length', 6)
    })

    it('a card should display the correct information', () => {
      cy.get('[data-cy="crypto-card"]').first().within(() => {
        cy.get('[data-cy="crypto-header"]').should('contain', 'Bitcoin')
        cy.get('[data-cy="crypto-header"]').find('img').should('be.visible')
        cy.get('[data-cy="crypto-price"]').should('contain', '$48839.76')
        cy.get('[data-cy="crypto-change"]').should('contain', '0.48%')
      })
    })
  })
  describe('unsuccessfully', () => {
    beforeEach(() => {
      cy.server()
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/markets?*",
        response: 'fixture:market_cap.json',
      })
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/currencies",
        response: {
          errors: "Couldn't render information. Please update"
        },
        status: 500,
      })

    })

    it('renders an error message', () => {
      cy.visit('/')
      cy.get('[data-cy="crypto-cards"]').find('h2').should('contain', "Couldn't render information. Please update")
    })
  })
})