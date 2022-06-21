// authenticator_spec.cy.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
describe('Aws Sign in Test', () => {
  it('should let me sign in', () => {
    cy.visit('http://localhost:3000/');

    cy.get('*[class^="amplify-input"]').first().type('sebf3519@gmail.com');

    cy.get('*[id^="amplify-id-:r5:"]').type('Dummy1234-');

    cy.get('[class^="amplify-button"]').contains('Sign in').click();

    cy.get('[id="nanji"]').should('have.text', 'Nanji');
  });
});
