describe('displays info about Market Cap', () => {
  describe('successfully', () => {
    beforeEach(() => {
      cy.server()
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/markets?*",
        response: 'fixture:market_cap.json',
      })
      cy.visit('/')
    })

    it('displays today/s market cap', () => {
      cy.get('.market-card').within(() => {
        cy.get('[data-cy="daily-cap"]').should('contain', '1,459,765,421,943')
      })
    })
    it('displays today/s change in market cap', () => {
      cy.get('.market-card').within(() => {
        cy.get('[data-cy="daily-change"]').should('contain', '-12.5%')
      })
    })

    it('displays a chart', () => {
      cy.get('.market-card').within(() => {
        cy.get('[data-cy="market-chart"]').should('exist')
      })
    })
  })
  describe('unsuccessfully with bad response from API', () => {
    beforeEach(() => {
      cy.server()
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/markets?*",
        response: {
          error_message: 'Request failed with status code 500'
        },
        status: 500
      })
    })
    it('but still renders site and displays an error message ', () => {
      cy.visit("/")
      cy.get('.market-card').should('contain', 'Request failed with status code 500')
    })
  })
})