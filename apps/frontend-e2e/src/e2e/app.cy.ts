import { getGreeting } from '../support/app.po';

describe('Frontend App e2e', () => {
  describe('Home Page', () => {
    beforeEach(() => cy.visit('localhost:4200'));

    it('should display welcome message', () => {
      // Custom command example, see `../support/commands.ts` file
      cy.login('my-email@something.com', 'myPassword');

      // Function helper example, see `../support/app.po.ts` file
      getGreeting().contains('NX Workspace');
    });

    it('should visit product page and back to home', () => {
      cy.get('[data-cy="product_url"]').click();
      cy.get('[data-cy="home_url"]').click();
      getGreeting().contains('NX Workspace');
    });
  });

  describe('Product Page', () => {
    beforeEach(() => {
      cy.visit('localhost:4200/products');
    });

    it('should contain products title and button', () => {
      cy.get('[data-cy="products_heading"]').contains('Products');
      cy.get('[data-cy="product_add_button"]');
    });

    it('should go products form and back', () => {
      cy.get('[data-cy="product_add_button"]').click();
      cy.get('[data-cy="product_back_button"]').click();
      cy.get('[data-cy="products_heading"]').contains('Products');
    });
  });
});
