import { locators } from '@Cypress/support';

Cypress.Commands.add('login', (username: string, password: string) => {
    cy.get(locators.login).type(username);
    cy.get(locators.password).type(password);
});

Cypress.Commands.add('openRP', () => {
    cy.visit('/');
});
