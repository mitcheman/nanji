describe('Aws Sign in Test', () => {
  it('Should navigate to friends page', () => {
    cy.visit('http://localhost:3000/');

    cy.get('*[class^="amplify-input"]').first().type('sebf3519@gmail.com');

    cy.get('*[id^="amplify-id-:r5:"]').type('Dummy1234-');

    cy.get('[class^="amplify-button"]').contains('Sign in').click();

    cy.get('a[data-testid="friends"]').click();

    cy.get('div[class^="individualfriend"]').click();

    cy.get('h5').should('have.text', 'Current Profile |');
  });
});
