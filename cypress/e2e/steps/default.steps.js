import { Given, When, Then, Before, After } from "@badeball/cypress-cucumber-preprocessor";

Before({}, () => {
  cy.log('--- Starting a new scenario ---');
});

After({ tags: "@cleanup" }, () => {
  cy.log('--- Cleaning up after scenario ---');
  cy.task("db:reset");
});