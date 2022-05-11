import { Given, Then } from "cypress-cucumber-preprocessor/steps";

Then("I am navigated to {string} page", (urlPath) => {
  cy.url().should("eq", `${Cypress.config().baseUrl}${urlPath}`);
});

// This could be an endpoint or an ENV var PATH
Given("The db has been cleared", () => {
  cy.exec("yarn reseed");
});
