# cypress-login-automation

A small Cypress end-to-end test suite that validates the BlazeDemo login page (https://blazedemo.com/login).

## Quickstart

Prerequisites

- Node.js and npm (tested with Node 16+ but any recent LTS should work)

Install dependencies

```bash
npm install
```

Open Cypress Test Runner (interactive)

```bash
npx cypress open
```

Run tests headless (CI / local)

```bash
# run all specs
npx cypress run

# run only the login specs
npx cypress run --spec "cypress/e2e/login/**"
```

Tip: There are no npm scripts defined in `package.json` by default. You can add scripts like `cypress:open` and `cypress:run` if you prefer `npm run` shortcuts.

## What this repo contains

- `cypress/e2e/login/*.cy.js` — primary tests. See `loginValidation.cy.js` and `UIElementPresenceTest.cy.js` for examples.
- `cypress/fixtures/example.json` — fixture used by `loginValidation.cy.js` (aliased as `user`).
- `cypress/support/commands.js` — place to add reusable custom commands (currently a template).
- `cypress.config.js` — Cypress configuration (currently default with an empty `setupNodeEvents`).
- `package.json` — has Cypress as a devDependency (v^15.4.0); no run scripts are defined.

## Project conventions and patterns

- Tests use absolute URLs (examples call `cy.visit('https://blazedemo.com/login')`) — there is no `baseUrl` configured.
- Prefer attribute selectors and text queries: e.g. `cy.get('input[name="email"]')`, `cy.contains('label', 'E-Mail Address')`.
- Validation assertions use the DOM validity API rather than browser-native tooltips, e.g.:

```javascript
cy.get('input[name="email"]').then(
  ($el) => expect($el[0].validity.valueMissing).to.be.true
);
```

- Fixtures are aliased in `beforeEach` using `cy.fixture(...).as('user')` and accessed via `this.user` inside tests that use `function()` callbacks (not arrow functions). Keep that pattern when adding tests that rely on `this`.
