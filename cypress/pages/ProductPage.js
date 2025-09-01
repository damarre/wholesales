class ProductPage {
  elements = {
  
  };

  productCardByName(productName) {
    return cy.contains('h2.wp-block-post-title a', productName)
      .closest('[data-wp-key^="product-item-"]');
  }
  verifyNonWholesale(productName) {
    cy.log(`Verifying non-wholesale for product: ${productName}`);
    this.productCardByName(productName).within(() => {
      cy.get('.wp-block-post-title')
        .invoke('text')
        .then((text) => {
          cy.log(`Product title: ${text}`);
          expect(text).to.equal(productName);
        });
      
      cy.get('.woocommerce-Price-amount')
        .invoke('text')
        .then((text) => {
          cy.log(`Product price: ${text}`);
          expect(parseFloat(text.replace(/[^0-9.-]+/g, ""))).to.be.greaterThan(0);
        });

      cy.get('.add_to_cart_button').should('exist');
    });
    this.productCardByName(productName).click();
  }

  verifyWholesale(productName) {
    cy.log(`Verifying wholesale for product: ${productName}`);
    this.productCardByName(productName).within(() => {
      cy.get('.woocommerce-Price-amount')
        .eq(0)
        .invoke('text')
        .then((text) => {
          cy.log(`Original price: ${text}`);
          // expect(parseFloat(text.replace(/[^0-9.-]+/g, ""))).to.be.greaterThan(0);
        });

      cy.get('.woocommerce-Price-amount')
        .eq(1)
        .invoke('text')
        .then((text) => {
          cy.log(`Sale price: ${text}`);
          // expect(parseFloat(text.replace(/[^0-9.-]+/g, ""))).to.be.greaterThan(0);
        });

      cy.get('.woocommerce-Price-amount')
        .eq(2)
        .invoke('text')
        .then((text) => {
          cy.log(`Wholesale price: ${text}`);
          // expect(parseFloat(text.replace(/[^0-9.-]+/g, ""))).to.be.greaterThan(0);
        });

      cy.get('.add_to_cart_button').should('exist');
    });
    this.productCardByName(productName).click();
  }
}

export default new ProductPage();
