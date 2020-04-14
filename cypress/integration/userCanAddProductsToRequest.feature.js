describe("when products are visible", () => {
  before(() => {
    cy.exec("yarn start")
    cy.server();
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/products",
      response: "fixture:products.json",
    });
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/tasks",
      response: "fixture:taskList_response.json",
    });
    cy.route({
      method: "PUT",
      url: "http://localhost:3000/api/v1/tasks/1",
      response: "fixture:taskList_update_response.json",
    });
    cy.visit("/");
  });

  it("successfully add products", () => {
    cy.get("button").contains("Create your request").click();
    cy.get("#product-1").within(() => {
      cy.contains("Potatoes"); //product
      cy.contains("98"); //price
      cy.get("button").should("contain", "Add").click();
    });
    cy.get("#request-list").within(() => {
      cy.contains("Potatoes"); //product
    });
    cy.get("#product-2").within(() => {
      cy.contains("Shampoo"); //product
      cy.contains("130"); //price
      cy.get("button").should("contain", "Add").click();
    });
    cy.get("#request-list").within(() => {
      cy.contains("Potatoes"); //product
      cy.contains("Shampoo"); //product
    });
    cy.get('#total-price').should('contain', '228.0'); //product
  });
});
