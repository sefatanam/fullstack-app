import { get } from '../support/app.po';

describe('Frontend App e2e', () => {
  //   describe('Home Page', () => {
  //     beforeEach(() => cy.visit('localhost:4200/products'));
  //     it('should visit product page and back to home', () => {
  //       get('product_url').click();
  //       get('home_url').click();
  //       getGreeting().contains('NX Workspace');
  //     });
  //   });

  describe('Product Page', () => {
    beforeEach(() => {
      cy.visit('localhost:4200/products');
    });

    it('should contain products title and button', () => {
      get('products_heading').contains('Products');
      get('product_add_button');
    });

    it('should go products form and back', () => {
      get('product_add_button').click();
      get('product_back_button').click();
      get('products_heading').contains('Products');
    });

    it('should create a product', () => {
      get('product_add_button').click();
      get('form-title').contains('Products Form');

      //Fillup form

      const name = `Product ${new Date().getMilliseconds()}`;
      get('name').type(name);
      get('price').type('1');
      get('description').type('Test description');
      get('image').type('https://testurl.com');
      get('videoUrl').type('https://testurl.com');

      for (const word of ['product tag 1', 'product tag 2', 'product tag 3']) {
        cy.get('[data-cy="chip-input-control"]').type(word);
        cy.get('[data-cy="chip-input-control"]').type('{enter}');
      }
      cy.get('[data-cy="submit-button"]').click();
    });
  });
});
