import 'cypress-file-upload';
import moment from 'moment';

describe('Should create post when submitting a new post', () => {
  it('should let me sign in', () => {
    cy.visit('http://localhost:3000/');

    cy.get('*[class^="amplify-input"]').first().type('sebf3519@gmail.com');

    cy.get('*[id^="amplify-id-:r5:"]').type('Dummy1234-');

    cy.get('[class^="amplify-button"]').contains('Sign in').click();

    cy.get('a[data-testid="newPost"]').click();

    cy.get('input[placeholder="Search here..."]').type('Barcelona');

    cy.get('button[aria-label="Search"]').click();

    cy.get('div[class="locationsearchresults"] > svg').click();

    cy.get('input[id="picdate"]').type(`${moment().format('YYYY-MM-DD')}`);

    cy.get('textarea[placeholder="Enter Text Here"]').type('Some description');

    const dummyImage = 'dummy-image.jpg';

    cy.get('input[id="fileupload"]').attachFile(dummyImage);

    cy.get('button[id="submitbutton"]').click();

    cy.get('div[class="amplify-alert__body"]').should(
      'have.text',
      'File Uploaded',
    );

    cy.get('a[id="username"]').click();

    cy.get('div[data-testid="post"]').trigger('mouseover');

    cy.get('div[data-testid="post"] > div[class="post"] > svg').click();

    cy.get('div[class="modal"] > button[id="deletePost"]').click();

    cy.get('div[class="amplify-alert__body"]').should(
      'have.text',
      'Post Deleted',
    );
  });
});
