/**
 * @fileoverview
 * This Cypress test suite validates form field requirements on the
 * BlazeDemo Login Page (https://blazedemo.com/login).
 *
 * It ensures that the "E-Mail Address" and "Password" fields are required.
 * When the user attempts to submit the form without entering values,
 * appropriate validation messages should appear.
 */

const data_file = "example.json";

describe("Login Form Validation Test", () => {
  /**
   * Before each test, visit the BlazeDemo login page.
   * Using beforeEach() ensures that each test starts from a clean state.
   */
  beforeEach(function () {
    cy.visit("https://blazedemo.com/login");
    cy.fixture(data_file).as("user");
  });

  /**
   * Test Case: Verify that Email and Password fields are required.
   *
   * Steps:
   *  1. Leave both fields empty.
   *  2. Click the "Login" button.
   *  3. Assert that validation messages are displayed.
   *
   * Expected Result:
   *  - The user should see an error or validation message indicating
   *    that the "E-Mail Address" and/or "Password" field is required.
   */
  it("should show validation messages when required fields are empty", function () {
    // --- Step 1: Ensure fields are empty ---
    cy.get('input[name="email"]').should("have.value", "");
    cy.get('input[name="password"]').should("have.value", "");

    // --- Step 2: Attempt to submit form ---
    cy.get('button[type="submit"]').click();

    // --- Step 3: Check for validation messages ---
    // Depending on the site, this could be a text message or browser validation bubble.
    // Cypress cannot capture native HTML5 tooltips, so we check the 'required' attribute instead.
    cy.get('input[name="email"]').then(
      ($el) => expect($el[0].validity.valueMissing).to.be.true
    );
    cy.get('input[name="password"]').then(
      ($el) => expect($el[0].validity.valueMissing).to.be.true
    );
  });

  it("should show validation message when only email is provided", function () {
    // --- Step 1: Fill only the email field ---
    cy.get('input[name="email"]').type(this.user.email);
    // cy.fixture(data_file).then((data) => {
    // });

    // --- Step 2: Attempt to submit form ---
    cy.get('button[type="submit"]').click();

    // --- Step 3: Check for validation messages ---
    cy.get('input[name="email"]').then(
      ($el) => expect($el[0].validity.valueMissing).to.be.false
    );
    cy.get('input[name="password"]').then(
      ($el) => expect($el[0].validity.valueMissing).to.be.true
    );
  });

  it("should show validation message when only password  is provided", function () {
    // --- Step 1: Fill only the password field ---
    cy.get('input[name="password"]').type(this.user.password);
    // cy.fixture(data_file).then((data) => {
    // });
    // --- Step 2: Attempt to submit form ---
    cy.get('button[type="submit"]').click();
    // --- Step 3: Check for validation messages ---
    cy.get('input[name="email"]').then(
      ($el) => expect($el[0].validity.valueMissing).to.be.true
    );
    cy.get('input[name="password"]').then(
      ($el) => expect($el[0].validity.valueMissing).to.be.false
    );
  });
});
