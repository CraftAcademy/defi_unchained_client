describe('User can access news tab', () => {
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
    cy.get('.ui.pointing.secondary.menu').within(() => {
      cy.get('a').eq(1).click()
    })
  })

  describe('successfully as authenticated user', () => {
    beforeEach(() => {
      cy.route({
        method: "POST",
        url: "http://localhost:3000/api/auth",
        response: "fixture:registered_user.json",
        headers: {
          uid: 'user@email.com'
        }
      })
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/news?*",
        response: 'fixture:crypto_news.json',
      })
      cy.get('[data-cy="register-button"]').click()
      cy.get('[data-cy="registration-form"]').within(() => {
        cy.get('[data-cy="email-field"]').type('user@email.com')
        cy.get('[data-cy="password-field"]').type('password')
        cy.get('[data-cy="password-confirmation-field"]').type('password')
        cy.get('[data-cy="submit"]').click()
      })
    })

    it('user can register and then see content of Crypto News tab', () => {
      cy.get('[data-cy="news-header"]').should('contain', 'Latest Crypto News')
      cy.get('[data-cy="news-auth-error"]').should('not.exist')
      cy.get('.ui.items').find('[data-cy="news-article"]').should('have.length', 7)
    })

    it('user can change tabs and still see the news', () => {
      cy.get('.ui.pointing.secondary.menu').within(() => {
        cy.get('a').eq(0).click()
      })
      cy.get('.ui.pointing.secondary.menu').within(() => {
        cy.get('a').eq(1).click()
      })
      cy.get('.ui.items').find('[data-cy="news-article"]').should('have.length', 7)
    })
  })

  describe('successfully through signing in', () => {
    beforeEach(() => {
      cy.route({
        method: "POST",
        url: "http://localhost:3000/api/auth/sign_in",
        response: "fixture:sign_in_response.json",
        headers: {
          uid: 'test@email.com'
        }
      })
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/news?*",
        response: 'fixture:crypto_news.json',
      })
      cy.get('[data-cy="register-button"]').click()
      cy.get('[data-cy="registration-form"]').within(() => {
        cy.get('[data-cy="email-field"]').type('user@email.com')
        cy.get('[data-cy="password-field"]').type('password')
        cy.get('[data-cy="password-confirmation-field"]').type('password')
        cy.get('[data-cy="submit"]').click()
      })
    })
    
    it('user can register and then see content of Crypto News tab', () => {
      cy.get('[data-cy="news-header"]').should('contain', 'Latest Crypto News')
      cy.get('[data-cy="news-auth-error"]').should('not.exist')
      cy.get('.ui.items').find('[data-cy="news-article"]').should('have.length', 7)
    })
  })

  describe('unsuccessfully as unauthenticated user', () => {
    beforeEach(() => {
      cy.route({
        method: "POST",
        url: "http://localhost:3000/api/auth",
        response: {
          errors: {
            full_messages: ["Invalid login credentials. Please try again."],
          },
          success: false,
        },
        status: 401
      })
      cy.get('[data-cy="register-button"]').click()
      cy.get('[data-cy="registration-form"]').within(() => {
        cy.get('[data-cy="email-field"]').type('user@email.com')
        cy.get('[data-cy="password-field"]').type('password')
        cy.get('[data-cy="password-confirmation-field"]').type('password')
        cy.get('[data-cy="submit"]').click()
      })
    })

    it('Displays a login message', () => {
      cy.get('.ui.dimmer').click("topLeft")
      cy.get('[data-cy="news-auth-error"]').should('contain', 'You will need to login in order to see the news.')
    })
  })
})