class DetailProduct {
  // debug damar
  elements = {
    productLayout: () => cy.get('.wp-block-column'),
    productTitle: () => cy.get('.wp-block-post-title'),
    productPrice: () => cy.get('.woocommerce-Price-amount'),
    productQty: () => cy.get('.input-text.qty.text'),
    addToCartButton: () => cy.get('button[type="submit"]'),
  };

  productDetailName(productName) {
    this.elements.productLayout().eq(1).within(() => {
      this.elements.productTitle()
        .invoke('text')
        .then((text) => {
          cy.log(`Product detail name: ${text}`);
          expect(text).to.equal(productName);
        })
      this.elements.productPrice().eq(0)
        .invoke('text')
        .then((text) => {
          cy.log(`Product detail original price: ${text}`);
          expect(parseFloat(text.replace(/[^0-9.-]+/g, ""))).to.be.greaterThan(0);
        });
      this.elements.productPrice().eq(1)
        .invoke('text')
        .then((text) => {
          cy.log(`Product detail sale price: ${text}`);
          expect(parseFloat(text.replace(/[^0-9.-]+/g, ""))).to.be.greaterThan(0);
        });
      this.elements.productPrice().eq(2)
        .invoke('text')
        .then((text) => {
          cy.log(`Product detail wholesale price: ${text}`);
          expect(parseFloat(text.replace(/[^0-9.-]+/g, ""))).to.be.greaterThan(0);  
        });
      this.elements.productQty()
        .should('have.value', '1');
      this.elements.addToCartButton().click();
    });
  }
}

export default new DetailProduct();
