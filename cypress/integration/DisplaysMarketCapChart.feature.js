describe('displays info about Market Cap', () => {
  describe('successfully', () => {
    beforeEach(() => {
      cy.server()
      cy.route(
        "GET",
        "http://localhost:3000/api/markets",
        "fx:market_cap.json"
      )
      cy.visit('/')
    })

    it('displays today/s market cap', () => {
      cy.get('[data-cy="market-container"]').within(() => {
        cy.get('[data-cy="daily-cap"]').should('contain', '1383290209')
      })
    })
    it('displays today/s change in market cap', () => {
      cy.get('[data-cy="market-container"]').within(() => {
        cy.get('[data-cy="daily-change"]').should('contain', '-4.3%')
      })
    })
  })
})