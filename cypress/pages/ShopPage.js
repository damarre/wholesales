class ShopPage {
  elements = {
    shopLink: () => cy.contains('a', 'Shop'),
    shopHeader: () => cy.contains('h1', 'Shop'),
    wholesalePriceContainer: () => cy.get('.wholesale_price_container'),
    originalComputedPrice: () => cy.get('.original-computed-price'),
    regularPrice: () => cy.get('.woocommerce-Price-amount'),
    addToCartButton: (productName) =>
      cy.contains('h2.wp-block-post-title a', productName)
        .closest('li')
        .find('button.add_to_cart_button'),
    originalPrice: (productName) =>
      cy.contains('h2.wp-block-post-title a', productName)
        .closest('li')
        .find('del.original-computed-price > del > .woocommerce-Price-amount'),
    wholesalePrice: (productName) =>
      cy.contains('h2.wp-block-post-title a', productName)
        .closest('li')
        .find('.wholesale_price_container .woocommerce-Price-amount'),
    salePrice: (productName) =>
      cy.contains('h2.wp-block-post-title a', productName)
        .closest('li')
        .find('ins .woocommerce-Price-amount'),
    viewCartButton: (productName) =>
      cy.contains('h2.wp-block-post-title a', productName)
        .closest('li')
        .find('.added_to_cart'),
  };

  clickShopLink() {
    this.elements.shopLink().click();
  }

  assertShopHeaderVisible() {
    this.elements.shopHeader().should('be.visible');
  }

  productCardByName(productName) {
    return cy.contains('h2.wp-block-post-title a', productName)
      .closest('[data-wp-key^="product-item-"]');
  }

  productCardName1(productName) {
    return cy.contains('h2.wp-block-post-title a', productName)
      .closest('[data-wp-interactive="woocommerce/product-collection"]');
  }

  navigateAndVerifyShop() {
    this.clickShopLink();
    this.assertShopHeaderVisible();
  }

  // Helper methods for price containers
  wholesalePriceContainer(card) {
    return card.get('.wholesale_price_container .woocommerce-Price-amount bdi');
  }

  originalPriceContainer(card) {
    return card.get('.original-computed-price .woocommerce-Price-amount');
  }

  checkProductExists(productName) {
    this.productCardByName(productName).should('exist');
  }

  verifyProduct(productName, options = {}) {
    const { wholesalePrice, originalPrice, salePrice, wholesalePriceNotFound, hasOriginalPrice, isWholesale, originalRegulerPrice } = options;

    this.productCardByName(productName).within(() => {
      // Check wholesale price
      if (wholesalePrice) {
        cy.get('.wholesale_price_container').then(($wholesale) => {
          if ($wholesale.length > 0) {
            this.wholesalePriceContainer(cy.wrap($wholesale))
              .invoke('text')
              .then((priceText) => {
                cy.log(`*** Wholesale price of ${productName}: ${priceText}`);
                const price = parseInt(priceText.replace(/[^\d]/g, ''), 10);
                expect(price).to.eq(wholesalePrice);
              });
          } else {
            cy.log('No wholesale price found for this product');
          }
        });
      }

      if (wholesalePriceNotFound) {
        cy.get('.wholesale_price_container').should('not.exist');
        cy.log(`Verified that no wholesale price is displayed for ${productName}`);
      }

      // Check original price dynamically (no hasWholesalePrice flag)
      if (originalPrice) {
        cy.get('.original-computed-price').then(($originals) => {
          const priceElements = $originals.find('.woocommerce-Price-amount');
          const count = priceElements.length;

          const target = count === 1
            ? cy.wrap(priceElements)
            : cy.wrap(priceElements).eq(0);

          target.invoke('text').then((text) => {
            cy.log(`Original price of: ${text}`);
            const priceValue = parseInt(text.replace(/[^\d]/g, ''), 10);
            expect(priceValue).to.eq(originalPrice);
          });
        });
      }

      if (originalRegulerPrice) {
        cy.get('.woocommerce-Price-amount.amount').then(($prices) => {
          const count = $prices.length;

          if (count === 0) {
            cy.log('No price element found in fallback');
            return;
          }

          const target = count === 1
            ? cy.wrap($prices)
            : cy.wrap($prices).eq(0); // Use index 0 if multiple

          target.invoke('text').then((text) => {
            cy.log(`Original price (fallback): ${text}`);
            const priceValue = parseInt(text.replace(/[^\d]/g, ''), 10);
            expect(priceValue).to.eq(originalRegulerPrice);
          });
        });
      }

      // Check sale price based on user type
      if (salePrice) {
        cy.get('.woocommerce-Price-amount')
          .eq(1) // Get the second price (sale price)
          .invoke('text')
          .then((text) => {
            cy.log(`Sale price text: ${text}`);
            const priceValue = parseInt(text.replace(/[^\d]/g, ''), 10);
            expect(priceValue).to.eq(salePrice); 
        });
      }
    });
  }

  // Add product to cart by product name
  addToCart(productName) {
    this.elements.addToCartButton(productName).click();
  }

  // start debug damar
  navigateToCartFromProduct() {
    cy.get('@selectedProduct').then((productName) => {
      cy.log(`- Navigating to Cart from product: ${productName}`);
      this.productCardByName(productName).within(() => {
        cy.get('.wp-block-post-title')
          .invoke('text')
          .then((title) => {
            cy.log(`- Product title: ${title}`);
          });
        cy.get('.added_to_cart')
          .invoke('text')
          .then((text) => {
            cy.log(`- Added to cart text: ${text}`);
          });
        cy.get('.added_to_cart').click();
      });
    });
  }

  clickProductDetail(productName) {
    cy.get('@selectedProduct').then((productName) => {
      this.productCardByName(productName).within(() => {
        cy.get('.wp-block-post-title').click();
      });
    });
  }

  clickProductDetail1(productName) {
    cy.get('@selectedProduct').then((productName) => {
      this.productCardName1(productName).within(() => {
        cy.get('.wp-block-post-title').click();
      });
    });
  }

  selectFilter(filterName) {
    // Default sorting
    // Sort by popularity
    // Sort by average rating
    // Sort by latest
    // Sort by price: low to high
    // Sort by price: high to low
    cy.get('select.orderby').select(filterName);
  }

  checkProductExists_() {
    const products = ['3-Speed Bike', 'Black and White', 'Hi-Fi Headphones'];
    products.forEach((productName) => {
      this.productCardByName(productName).within(() => {
        cy.log(`- Checking product: ${productName}`);
        cy.get('.wp-block-post-title').should('have.text', productName)
      });
    });
  }
}

export default new ShopPage();
