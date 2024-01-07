import { locators } from '@Cypress/support';
import { validProject } from '@Resources/constants';
import launchesExpectedData from '@Resources/test-data.json';

context('Launch page', () => {
    before(() => {
        cy.openRP();
        cy.login(Cypress.env('REPORT_USERNAME'), Cypress.env('REPORT_PASSWORD'));
        cy.get(locators.submitButton).click();

        cy.intercept('GET', `/api/v1/${validProject}/launch*`)
            .as('allLaunches');

        cy.get(locators.projectsButton).click();
        cy.get(locators.actualProjectButton).first().click();
        cy.get(locators.launchesButton).click();
    });

    it('should have corresponding Launch infos', () => {
        cy.wait('@allLaunches').then((intercept)=>{
            const launchesResponse = intercept.response;
            const expectedLaunchesArray = [...launchesExpectedData.content
                .sort((a, b) => { return b.number - a.number; })];
            const actualLaunchesArray = [...launchesResponse.body.content];

            expect(launchesResponse.statusCode).to.equal(200);

            for (let i = 0; i < actualLaunchesArray.length; i++) {
                expect(actualLaunchesArray[i].id).to.equal(expectedLaunchesArray[i].id);
                expect(actualLaunchesArray[i].uuid).to.equal(expectedLaunchesArray[i].uuid);
                expect(actualLaunchesArray[i].description).to.equal(expectedLaunchesArray[i].description);
            }
        });
    });
});
