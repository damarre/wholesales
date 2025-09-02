class CheckoutPage {
    elements = {
        placeOrderButton: () => cy.contains('button', 'Place Order'),
        getWholesalePriceByProduct: (productName) =>
            cy.contains('h3.wc-block-components-product-name', productName)
              .closest('.wc-block-components-order-summary-item')
              .find('ins.wc-block-components-product-price__value'),
        getOriginalPriceByProduct: (productName) =>
            cy.contains('h3.wc-block-components-product-name', productName)
              .closest('.wc-block-components-order-summary-item')
              .find('.wc-block-components-product-price__regular'),

    }
    getWholesalePriceByProduct(productName) {
      return this.elements.getWholesalePriceByProduct(productName)
        .invoke('text')
        .then((text) => {
          // regex to extract numeric value
          const cleaned = text.replace(/[^\d.,]/g, '').replace(',', '.');
          return parseFloat(cleaned);
        });
    }

    getOriginalPriceByProduct(productName) {
      return this.elements.getOriginalPriceByProduct(productName)
        .invoke('text')
        .then((text) => {
          // regex to extract numeric value
          const cleaned = text.replace(/[^\d.,]/g, '').replace(',', '.');
          return parseFloat(cleaned);
        });
    }

    clickPlaceOrderButton() {
      this.elements.placeOrderButton().click();
    }

    checkPlaceOrderButtonIsVisible() {
      this.elements.placeOrderButton().should('be.visible');
    }

}

export default new CheckoutPage();
