import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import ProductPage from "../../pages/ProductPage";

When("I select {string} product--", function (productName) {
  // ProductPage.verifyNonWholesale(productName)
  ProductPage.verifyWholesale(productName)
});