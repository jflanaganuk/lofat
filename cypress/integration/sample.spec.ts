describe("Go Around the site", () => {
    it("Clears sw cache before beginning tests", () => {
        clearSWCache();
    });

    it("Visits the homepage (Desktop)", () => {
        goAroundTheSite();
    });

    it("Visits the homepage (Mobile)", () => {
        cy.viewport(400, 750);
        goAroundTheSite();
    });
});

function clearSWCache() {
    /* Delete Service Worker Caches */
    self.addEventListener("activate", function (event) {
        /* @ts-ignore */
        event.waitUntil(
            caches.keys().then(function (cacheNames) {
                /* @ts-ignore */
                return Promise.all(
                    cacheNames.map(function (cacheName) {
                        return caches.delete(cacheName);
                    })
                );
            })
        );
    });
}

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
