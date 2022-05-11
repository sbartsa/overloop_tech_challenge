import { assert } from "chai";
import { When, Then } from "cypress-cucumber-preprocessor/steps";
import { articleLocators } from "../../locators";

const article = {
  title: "",
  content: "",
  regions: [],
};

const generateRandomId = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// --------------- WHEN ---------------
When("I visit the articles page", () => {
  cy.intercept({ method: "GET", url: "**/articles" }).as("articles");
  cy.visit("/articles");
});

When("I create a random article", () => {
  const randomArticle = {
    ...article,
    title: `My new random Article ${generateRandomId(100, 999)}`,
  };
  cy.createArticle(randomArticle);
});

When("I click on create article button", () => {
  cy.get('a[href="/articles/create"]').click();
});

When(`Article has title {string}`, (title) => {
  article.title = `${title} ${generateRandomId(100, 999)}`;
});

When("Article has content {string}", (content) => {
  article.content = content;
});

When("Article includes region {string}", (region) => {
  article.regions.push(region);
});

When("I save the article", () => {
  cy.createArticle(article);
});

When("I click on my last created article", () => {
  cy.get(articleLocators.articleListElement).contains(article.title).click();
});

// ---------------  THEN ---------------
Then("The article list has been requested", () => {
  cy.wait("@articles").then(({ response }) => {
    assert.equal(response.statusCode, 200);
  });
});

Then("Article should have correct title", () => {
  cy.get(articleLocators.titleInput).should("have.value", article.title);
});

Then("Article should have correct content", () => {
  cy.get(articleLocators.contentInput).should("have.value", article.content);
});

Then("Article should have correct regions", () => {
  cy.get(articleLocators.regionSelectionList).each(($el, index) => {
    console.log("Element is: ", $el, "and index is ", index);
    cy.wrap($el).should("have.text", `${article.regions[index]}×`);
  });
});

Then("All articles have been listed", () => {
  cy.request({
    url: `${Cypress.config().baseDBUrl}/articles`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((articles) => {
    cy.get(articleLocators.articleListContainer)
      .find(articleLocators.articleListElement)
      .should("have.length", articles.body.length);
  });
});
