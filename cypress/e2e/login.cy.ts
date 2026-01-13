import { expectedErrorMessage, expectedDashboardsPageTitle } from '@Resources/constants';
import { CREDENTIALS } from '@Config/config-data';
import { locators } from '@Cypress/support';

context('Login application', () => {
    beforeEach(() => {
        cy.openRP();
    });

    it('should Login with valid credentials', () => {
        cy.login(Cypress.env('REPORT_USERNAME'), Cypress.env('REPORT_PASSWORD'));
        cy.get(locators.submitButton).click();
        cy.get(locators.dashboardTitle).should('be.visible');
        cy.get(locators.dashboardTitle).invoke('text').should('eq',expectedDashboardsPageTitle);
    });

    it('should not Login with valid credentials', () => {
        cy.login(CREDENTIALS.INVALID.USERNAME, CREDENTIALS.INVALID.PASSWORD);
        cy.get(locators.submitButton).click();
        cy.get(locators.invalidUserNamePasswordError).invoke('text').should('eq',expectedErrorMessage);
    });
});
