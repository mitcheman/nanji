describe('Aws Sign in Test', () => {
  it('Should show a warning when trying to delete account', () => {
    cy.visit('http://localhost:3000/');

    cy.get('*[class^="amplify-input"]').first().type('sebf3519@gmail.com');

    cy.get('*[id^="amplify-id-:r5:"]').type('Dummy1234-');

    cy.get('[class^="amplify-button"]').contains('Sign in').click();

    cy.get('a[data-testid="account"]').click();

    cy.get('h3').first().should('have.text', 'Account Details');

    cy.get('button[id^="deleteAccount"]').click();

    cy.get('h1').should('have.text', 'WARNING');
  });
});
