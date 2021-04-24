describe("Go Around the site", () => {
    it("Visits the homepage (Desktop)", () => {
        goAroundTheSite();
    });

    it("Visits the homepage (Mobile)", () => {
        cy.viewport(400, 750);
        goAroundTheSite();
    });
});

function goAroundTheSite() {
    cy.visit("/");
    cy.get("img");
    cy.get(".menuItem").eq(1).click();
    cy.url().should("include", "/search");
    cy.get("#searchInput").type("box").type("{enter}");
    cy.url().should("include", "/search?query=box");
    cy.get(".searchResult").should("not.be", null);
    cy.get(".searchResult").eq(0).click();
    cy.url().should("include", "/movie");
    cy.get(".menuItem").eq(0).click();
    cy.url().should("not.include", "/movie");
}
