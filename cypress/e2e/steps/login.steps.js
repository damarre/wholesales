import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import PageFactory from '../../pages/PageFactory';
import LoginPage from '../../pages/LoginPage';

Given("I am logged in as {string} with password {string}", function (username, password) {
  PageFactory.navigateToPage('Login');
  LoginPage.fillUsername(Cypress.env(username));
  LoginPage.fillPassword(Cypress.env(password));
  LoginPage.clickLogin();
  cy.url().should('include', '/my-account/');
});
