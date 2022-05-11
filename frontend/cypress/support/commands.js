Cypress.Commands.add("createArticle", (article) => {
  console.log("article is: ", article);
  cy.visit("").get('a[href="/articles/create"]').click();
  cy.get('input[placeholder="Title"]')
    .type(article.title)
    .get(".btn-primary")
    .get('textarea[placeholder="Content"]')
    .type(article.content);

  article.regions.forEach((region) => {
    cy.get('div[class="form-group"] div input').type(region).type("{ENTER}");
  });
  cy.get("input").first().click();
  cy.get(".btn-primary").click();
});
