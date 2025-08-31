describe("Login Form E2E", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("Başarılı form submit", () => {
    cy.get('input[name="email"]').type("test@example.com");
    cy.get('input[name="password"]').type("StrongPass1!");
    cy.get('input[name="terms"]').check();
    cy.get('button[type="submit"]').should("not.be.disabled").click();
    cy.url().should("include", "/success");
    cy.contains("Login Başarılı");
  });

  it("Hatalı durumlar", () => {
    // Email yanlış
    cy.get('input[name="email"]').type("wrongemail");
    cy.get('input[name="password"]').type("StrongPass1!");
    cy.get('input[name="terms"]').check();
    cy.get('button[type="submit"]').should("be.disabled");
    cy.contains("Geçerli bir email giriniz.");

    // Email ve password yanlış
    cy.get('input[name="email"]').clear().type("wrong@email");
    cy.get('input[name="password"]').clear().type("weak");
    cy.get('button[type="submit"]').should("be.disabled");
    cy.contains("Geçerli bir email giriniz.");
    cy.contains("Şifre güçlü olmalı");

    // Email ve password doğru ama checkbox unchecked
    cy.get('input[name="email"]').clear().type("test@example.com");
    cy.get('input[name="password"]').clear().type("StrongPass1!");
    cy.get('input[name="terms"]').uncheck();
    cy.get('button[type="submit"]').should("be.disabled");
    cy.contains("Şartları kabul etmelisiniz.");
  });
});
