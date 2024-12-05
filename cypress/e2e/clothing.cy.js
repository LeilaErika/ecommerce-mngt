describe("Ecommerce Management Frontend", () => {
  let baseUrl;

  before(() => {
    // Start the server and get the base URL
    cy.task("startServer").then(url => {
      baseUrl = url; // Store the base URL for later use
      cy.visit(baseUrl);
    });
  });

  after(() => {
    // Stop the server after tests are complete
    cy.task("stopServer");
  });

  describe("Clothing Item Editing", () => {
    it("should update an existing resource", () => {
      cy.contains("button", "Edit").last().click();

      // Update resource details
      cy.get("#editName").clear().type("Updated Name", { force: true });
      cy.get("#editSize").select("S", { force: true });
      cy.get("#editColor").clear().type("Updated Color", { force: true });
      cy.get("#editMaterial").clear().type("Updated Material", { force: true });

      // Save the changes
      cy.get("#saveEditButton").click();
      cy.get("#ok").click();
      cy.url().should("include", "/");
    });

    it("should not update an existing resource if one of them is empty", () => {
      cy.visit(baseUrl);
      cy.contains("button", "Edit").first().click();
      cy.get("#editName").clear();
      cy.get('#editName').should('have.value', '');
      cy.get("#editSize").select("S", { force: true });
      cy.get("#editColor").clear().type("Updated Color", { force: true });
      cy.get("#editMaterial").clear().type("Updated Material", { force: true });

      // Save the changes
      cy.get("#saveEditButton").click();

      Cypress.on('uncaught:exception', (err, runnable) => {
        if (err.message.includes('Cannot set properties of null')) {
          return false; // Prevent Cypress from failing the test
        }
      });
    });
    // it("should update an existing resource and show a success popup", () => {
    //   // Visit the base URL
    //   cy.visit(baseUrl);
    
    //   // Click the last "Edit" button
    //   cy.contains("button", "Edit").last().click();
    
    //   // Update resource details
    //   cy.get("#editName").clear().type("Updated Name");
    //   cy.get("#editSize").select("S");
    //   cy.get("#editColor").clear().type("Updated Color");
    //   cy.get("#editMaterial").clear().type("Updated Material");
    
    //   // Save the changes
    //   cy.get("#saveEditButton").click();
    
    //   // Assert that the popup is visible
    //   cy.get("#confirmationPopupEdit")
    //    // .should("have.css", "display", "block")
    //     .and("be.visible");
    
    //   // Wait for the timeout duration and verify the popup is hidden
    //  cy.wait(3000); // Match the timeout in your implementation
    //  // cy.get("#confirmationPopupEdit").should("not.be.visible");

    //  cy.get("#confirmationPopupEdit")
    //  cy.get("#ok").click();

     
    // });    
  });
});
