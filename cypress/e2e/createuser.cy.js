describe('Aws Sign in Test', () => {
  it('should let me sign in', () => {
    cy.visit('http://localhost:3000/');

    cy.get('*[class^="amplify"]').contains('Create Account').click();

    cy.get('input[placeholder="Email"]').type(`${Math.random()}@deleteme.test`);

    cy.get('input[placeholder="Password"]').type('Dummy1234-');

    cy.get('input[placeholder="Confirm Password"]').type('Dummy1234-');

    cy.get('input[placeholder="Given Name"]').type('Dummy');

    cy.get('input[placeholder="Family Name"]').type('Dummyson');

    cy.get('input[placeholder="Preferred Username"]').type('MacDummy');

    cy.get('button[class^="amplify-button"]')
      .contains('Create Account')
      .click();

    cy.get('h4').should('have.text', 'We Emailed You');
  });
});
