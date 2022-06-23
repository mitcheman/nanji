describe('Aws Sign in Test', () => {
  it('should let me sign in', () => {
    cy.visit('http://localhost:3000/');

    cy.get('*[class^="amplify-input"]').first().type('sebf3519@gmail.com');

    cy.get('*[id^="amplify-id-:r5:"]').type('Dummy1234-');

    cy.get('[class^="amplify-button"]').contains('Sign in').click();

    cy.get('[id="nanji"]').should('have.text', 'Nanji');

    cy.get('button[data-testid="signOut"]').click();

    cy.get('div[class="modal"] > button[id="logout"]').click();

    cy.get(
      'div[data-amplify-footer] > button[class="amplify-button amplify-field-group__control amplify-button--link amplify-button--small"]',
    ).should('have.text', 'Forgot your password?');
  });
});
