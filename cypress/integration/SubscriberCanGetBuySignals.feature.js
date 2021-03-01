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
          paid: true,
          message: "You are now a subscriber!"
        }
      })
      cy.get('.ui.pointing.secondary.menu').within(() => {
        cy.get('a').eq(2).click()
      })
    })

    it('displays the subscriber form and subscribes successfully', () => {
      cy.get('[data-cy="subscribe"]').click()
      cy.wait(1000)

      cy.get('[data-cy="payment-form"]').within(() => {
        cy.get('[data-cy="card-number"]').within(() => {
          cy.get('iframe[name^="__privateStripeFrame"]').then($iframe => {
            const $body = $iframe.contents().find('body')
            cy.wrap($body)
              .find('input[name="cardnumber"]')
              .type('4242424242424242', { delay: 50 })
          })
        })
        cy.get('[data-cy="card-expiry"]').within(() => {
          cy.get('iframe[name^="__privateStripeFrame"]').then($iframe => {
            const $body = $iframe.contents().find('body')
            cy.wrap($body)
              .find('input[name="exp-date"]')
              .type('0424', { delay: 10 })
          })
        })
        cy.get('[data-cy="card-cvc"]').within(() => {
          cy.get('iframe[name^="__privateStripeFrame"]').then($iframe => {
            const $body = $iframe.contents().find('body')
            cy.wrap($body)
              .find('input[name="cvc"]')
              .type('424', { delay: 50 })
          })
        })
        cy.route({
          method: "GET",
          url: "http://localhost:3000/api/subscriptions",
          response: {
            subscriber: true
          }
        })
        cy.get('[data-cy="submit-payment"]').click()
      })
      cy.wait(1000)
      cy.get('[data-cy="welcome-subscriber"]').should('contain', 'Welcome!').and('contain', 'Today you should buy')
    })

    it('Shows content when user is subscriber', () => {
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/subscriptions",
        response: {
          subscriber: true
        }
      })
      cy.get('a').eq(1).click()
      cy.get('a').eq(2).click()
      cy.get('[data-cy="signal-wrapper"]').within(() => {
        cy.get('[data-cy="signal-coin"]').should('contain', 'Ethereum')
        cy.get('[data-cy="signal-logo"]').should('have.attr', 'src', 'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/currencies/eth.svg')
      })
    })

  })
})