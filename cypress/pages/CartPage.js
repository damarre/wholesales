class CartPage {
  // CartPage methods and elements
  elements = {
    checkoutButton: () => cy.get('.wc-block-cart__submit-button'),
    originalPrice: (productName) =>
      cy.contains('.wc-block-components-product-name', productName)
        .closest('.wc-block-cart-item__product')
        .find('.wc-block-components-product-price__regular'),
    wholesalePrice: (productName) =>
      cy.contains('.wc-block-components-product-name', productName)
        .closest('.wc-block-cart-item__product')
        .find('.is-discounted'),
    removeItem: (productName) =>
      cy.contains('.wc-block-components-product-name', productName)
        .closest('.wc-block-cart-item__product')
        .find('.wc-block-cart-item__remove-link'),
  };

    getOriginalPrice(productName) {
    return this.elements.originalPrice(productName)
      .invoke('text')
      .then((text) => {
      const cleaned = text.replace(/[^\d.,]/g, '').replace(',', '.');
        // cy.log(`- Original price of ${productName}: ${cleaned}`);
      return parseFloat(cleaned);
      });
    }

    getWholesalePrice(productName) {
    return this.elements.wholesalePrice(productName)
      .invoke('text')
      .then((text) => {
      const cleaned = text.replace(/[^\d.,]/g, '').replace(',', '.');
      return parseFloat(cleaned);
      });
    }

    removeProductFromCart(productName) {
      this.elements.removeItem(productName).click();
    }

    clearCartIfNotEmpty() {
      cy.get('body').then(($body) => {
        if ($body.find('.wc-block-cart-item__remove-link').length > 0) {
        cy.get('.wc-block-cart-item__remove-link').each(($btn) => {
          cy.wrap($btn).click();
        });
          } else {
          cy.log('Cart is already empty');
          }
        });
    }

    getTotalPrice() {
      return cy.get('.wc-block-components-totals-footer-item-tax-value')
        .invoke('text')
        .then((text) => {
          const cleaned = text.replace(/[^\d.,]/g, '').replace(',', '.');
          return parseFloat(cleaned);
        });
    }

    clickCheckoutButton() {
      this.elements.checkoutButton().click();
    }

}

export default new CartPage();
