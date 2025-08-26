import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import CheckoutPage from '../../pages/CheckoutPage';

Then("I click place order button from checkout", function () {
  CheckoutPage.clickPlaceOrderButton();
});

Then("the checkout should display a wholesale price of {int}", function (wholesalePrice) {
  cy.get('@selectedProduct').then((productName) => {
    cy.log(`- Selected product in cart step: ${productName}`);
    CheckoutPage.getWholesalePriceByProduct(productName).should('eq', wholesalePrice);
  });
});

Then("I see place order button is available", function () {
  CheckoutPage.checkPlaceOrderButtonIsVisible();
});
