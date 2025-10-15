/**
 * @fileoverview
 * Cypress test verifying the BlazeDemo login form UI.
 *
 *Confirms that the login form renders:
 *  - "E-Mail Address" label and email input
 *  - "Password" label and password input
 *  - "Remember Me" checkbox and label
 *  - Login button and "Forgot Your Password?" link
 */

describe("UI Elements Presence Test", () => {
  /**
   * Before each test, visit the BlazeDemo login page.
   * Using beforeEach() ensures a clean browser state per test.
   */
  beforeEach(() => {
    cy.visit("https://blazedemo.com/login");
  });

  /**
   * Test Case: Verify the login form renders fields and their associated labels.
   *
   * This test ensures:
   *  - The "E-Mail Address" label and email input are visible.
   *  - The "Password" label and password input are visible.
   *  - The "Remember Me" checkbox and its label are visible.
   *  - The Login button and "Forgot Your Password?" link are visible.
   *
   * These checks confirm that the login form UI is correctly rendered.
   */
  it("renders login form fields and associated labels", () => {
    // --- Email Field ---
    cy.contains("label", "E-Mail Address").should("be.visible");
    cy.get('input[name="email"]').should("be.visible");

    // --- Password Field ---
    cy.contains("label", "Password").should("be.visible");
    cy.get('input[name="password"]').should("be.visible");

    // --- Remember me checkbox ---
    cy.contains("label", "Remember Me").should("be.visible");
    cy.get('input[name="remember"]').should("be.visible");

    // --- Login button ---
    cy.get('button[type="submit"]').contains("Login").should("be.visible");

    // --- Forgot Your Password link ---
    cy.contains("a", "Forgot Your Password?").should("be.visible");
  });

  it("checks input field types", () => {
    cy.get('input[type="email"]').should("be.visible");
    cy.get('input[type="password"]').should("be.visible");
  });
});
