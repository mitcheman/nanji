/// <reference types="Cypress" />

describe('Launching Nanji', () => {
  it('should visit Nanji', () => {
    cy.visit('http://localhost:3000')
  })
  
})


describe('Creating an account on Nanji', () => {
  it('should visit Nanji Create Account Page', () => {
    cy.visit('http://localhost:3000')
  })
  
  it('finds the content "Create Account"', () => {
    cy.contains('Create Account')
  })
  
  it('clicks the content "Create Account"', () => {
    cy.contains('Create Account').click();
  })
  
  it('should be able to find email input field and type in it', () => {
    cy.get('[placeholder="Email"]').type('unreal.karlmarx@gmail.com');
  })
  
  it('should be able to find password input field and type in it', () => {
    cy.get('[placeholder="Password"]').type('DasK4pit4L$$$');
  })
  
  it('should notify the user when password is wrong', () => {
    cy.get('[placeholder="Confirm Password"]').type('DasK4pit4L');
  })
  
  it('should make the password input visible when toggling the visibility button', () => {
    cy.get('[class="amplify-button amplify-field-group__control amplify-field__show-password"]').click({multiple: true});
  })
  
  it('should be able to correct the password', () => {
    cy.get('[placeholder="Confirm Password"]').type('$$$');
  })
  
  it('should make the password input hidden when toggling the visibility button', () => {
    cy.get('[class="amplify-button amplify-field-group__control amplify-field__show-password"]').click({multiple: true});
  })
  
  it('should be able to find the Given Name input field and type in it', () => {
    cy.get('[placeholder="Given Name"]').type('Karl');
  })
  
  it('should be able to find the Given Name input field and type in it', () => {
    cy.get('[placeholder="Family Name"]').type('Marx');
  })
  
  it('should be able to find the Preferred Username input field and type in it', () => {
    cy.get('[placeholder="Preferred Username"]').type('km');
  })
  
  it('should be able to submit form and create Account', () => {
    cy.get('[type="submit"]').click();
  })
  
})


describe('Signing in on Nanji', () => {
  it('should visit Nanji Create Account Page', () => {
    cy.visit('http://localhost:3000')
  })
  
  it('finds the content "Sign In"', () => {
    cy.contains('Sign In')
  })
  
  it('clicks the content "Sign In"', () => {
    cy.contains('Sign In').click();
  })
  
  it('should be able to find email input field and type in it', () => {
    cy.get('[placeholder="Email"]').type('unreal.karlmarx@gmail.com');
  })
  
  it('should be able to find password input field and type in it', () => {
    cy.get('[placeholder="Password"]').type('DasK4pit4L$$$');
  })
  
  it('should be able to click the sign in button. if the account does not exist it in the database it should prompt the user. else it should login', () => {
    cy.get('[type="submit"]').click();
  })
  

  
});