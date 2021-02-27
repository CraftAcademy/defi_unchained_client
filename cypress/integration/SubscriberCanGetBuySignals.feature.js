describe('Subscribe can get daily buy signals', () => {
  describe('Successfully as valid subscribe', () => {
    beforeEach(() => {
      cy.server()
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
        response: "fixture:subscriber.json"
      })
    })
  })
})