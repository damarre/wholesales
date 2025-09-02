import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import PageFactory from '../../pages/PageFactory';
import ShopPage from "../../pages/ShopPage";
import CartPage from "../../pages/CartPage";
import DetailProduct from "../../pages/DetailProduct";

Given("I am on the {string} page", function (string) {
  PageFactory.navigateToPage(string);
});

When("I add {int} units to the cart__", function (quantity) {
  cy.get('.wp-block-post-title').each(($el, index, $list) => {
    cy.log($el.text() + '===' + index + ' of ' + $list.length);
    // cy.wrap($el).click();
    expect($el).to.exist;
  });

  cy.get('@selectedProduct').then((productName) => {
    for (let i = 0; i < quantity; i++) {
      ShopPage.addToCart(productName);
      cy.wait(500);
    }
  });
});

When("I add {int} units to the cart", function (quantity) {
  cy.get('.wp-block-post-title').each(($el, index, $list) => {
    cy.log(`${$el.text()} === ${index + 1} of ${$list.length}`);
  });

  cy.get('@selectedProduct').then((productName) => {
    Cypress._.times(quantity, () => {
      ShopPage.addToCart(productName);
      cy.wait(500);
    });
  });
});

When("I navigate to the {string} page", function (string) {
  PageFactory.navigateToPage(string);
});

When("I select {string} product", function (productName) {
  cy.wrap(productName).as('selectedProduct');

  PageFactory.navigateToPage("Cart");
  // remove all products
  CartPage.clearCartIfNotEmpty();
  // damar debug
  // remove product based on product name
  // CartPage.removeProductFromCart(productName);
  PageFactory.navigateToPage("Shop");

  ShopPage.checkProductExists(productName);
});

Then(
  /^the "(Wholesale Price|Original Price|Sale Price|Original Reguler Price)" should be displayed with value (\d+)$/,
  (priceType, expectedValue) => {
    const expectedPrice = parseInt(expectedValue, 10);

    cy.get('@selectedProduct').then((productName) => {
      let options = {};

      switch (priceType.toLowerCase()) {
        case 'wholesale price':
          options = {
            wholesalePrice: expectedPrice,
          };
          break;

        case 'original price':
          options = {
            isReguler: false,
            originalPrice: expectedPrice,
          };
          break;

        case 'original reguler price':
          options = {
            isReguler: true,
            originalRegulerPrice: expectedPrice,
          };
          break;

        case 'sale price':
          options = {
            salePrice: expectedPrice,
          };
          break;

        default:
          throw new Error(`Unsupported price type: "${priceType}"`);
      }

      ShopPage.verifyProduct(productName, options);
    });
  }
);

Then("the Wholesale Price should not be displayed", function () {
  cy.get('@selectedProduct').then((productName) => {
    ShopPage.verifyProduct(productName, {
    wholesalePriceNotFound: true
    });
  });
});

// debug damar
When("I go to {string} page from selected product cart", function (string) {
  cy.log(`- Navigating to ${string} from product cart`);
  cy.get('@selectedProduct').then((productName) => {
    cy.log(`- Navigating to Cart from product: ${productName}`);
    ShopPage.navigateToCartFromProduct(productName);
  });
});

When("I filter product cart by {string}", function (string) {
  ShopPage.selectFilter(string);
});

When("I see product detail", function () {
  // ShopPage.checkProductExists();
  // ShopPage.clickProductDetail();
  cy.get('@selectedProduct').then((productName) => {
    DetailProduct.productDetailName(productName);
  });
});
