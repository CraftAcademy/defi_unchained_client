describe('Subscribe can get daily buy signals', () => {
  describe('Successfully as valid subscriber', () => {
    beforeEach(() => {
      cy.server()
      cy.visit("/")
      cy.route({
        method: "POST",
        url: "http://localhost:3000/api/auth/sign_in",
        response: "fixture:sign_in_response.json",
        headers: {
          uid: 'user@email.com'
        }
      })
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/buy_signals",
        response: "fixture:buy_signals.json"
      })
      cy.get('[data-cy="register-button"]').click()
      cy.get('[data-cy="sign-in-button"]').click()
      cy.get('[data-cy="registration-form"]').within(() => {
        cy.get('[data-cy="email-field"]').type('user@email.com')
        cy.get('[data-cy="password-field"]').type('password')
        cy.get('[data-cy="submit"]').click()
      })
      cy.route({
        method: "POST",
        url: "http://localhost:3000/api/subscriptions",
        response: {
          subscriber: true,
          message: "Congratulations!"
        }
      })
      cy.get('.ui.pointing.secondary.menu').within(() => {
        cy.get('a').eq(2).click()
      })
    })

    it('Shows content when user is subscriber', () => {
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/subscriptions",
        response: {
          subscriber: true
        }
      })
      cy.get('[data-cy="subscribe"]').click()
      cy.get('[data-cy="signal-wrapper"]').within(() => {
        cy.get('[data-cy="signal-coin"]').should('contain', 'Ethereum')
        cy.get('[data-cy="signal-logo"]').should('have.attr', 'src', 'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/currencies/eth.svg')
      })
    })
  })
})