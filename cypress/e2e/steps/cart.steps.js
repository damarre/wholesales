import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import CartPage from '../../pages/CartPage';
import ShopPage from "../../pages/ShopPage";
import PageFactory from '../../pages/PageFactory';

Then("the cart should display an original price of {int}", function (originalPrice) {
  cy.get('@selectedProduct').then((productName) => {
    cy.log(`- Selected product in cart step: ${productName}`);
    CartPage.getOriginalPrice(productName).should('eq', originalPrice);
  });
});

Then("the cart should display a wholesale price of {int}", function ( wholesalePrice) {
  cy.get('@selectedProduct').then((productName) => {
    cy.log(`- Selected product in cart step: ${productName}`);
    CartPage.getWholesalePrice(productName).should('eq', wholesalePrice);
  });
});

Then("the cart should display a total price of {int}", function (totalPrice) {
  cy.get('@selectedProduct').then((productName) => {
    cy.log(`- Selected product in cart step: ${productName}`);
    CartPage.getTotalPrice(productName).should('eq', totalPrice);
  });
});

When("I click checkout button from cart", function () {
  cy.get('@selectedProduct').then((productName) => {
    CartPage.clickCheckoutButton();
  });
});

Given("I clear the cart if not empty", function () {
  PageFactory.navigateToPage("Cart");
  CartPage.clearClear();
//   CartPage.clearCartIfNotEmpty();
  PageFactory.navigateToPage("Shop");
});