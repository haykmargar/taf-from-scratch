import { locators } from '@Cypress/support';

context('Dashboard page', () => {

    before(() => {
        cy.openRP();
        cy.login(Cypress.env('REPORT_USERNAME'), Cypress.env('REPORT_PASSWORD'));
        cy.get(locators.submitButton).click();
    });

    it('should drag and drop widget', () => {
        cy.get(locators.projectsButton).click();
        cy.get(locators.actualProjectButton).first().click();
        cy.get(locators.dashboardButton).click();
        cy.get(locators.actualDashboardLocator).click();
        cy.get(locators.widgetDragAndDropHandler).first()
            .trigger('mousedown')
            .trigger('mousemove', { clientX: 0, clientY: -150 })
            .trigger('mouseup', { force: true });
    });
});
