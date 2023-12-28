import { defineConfig } from 'cypress';

export default defineConfig({
    e2e: {
        baseUrl: 'https://rp.epam.com/ui/#login',
        specPattern: './cypress/e2e/**/*.cy.ts',
        screenshotsFolder: './cypress/reports/screenshot',
        trashAssetsBeforeRuns: true,
        screenshotOnRunFailure: true,
        video: false,
        reporter: 'mochawesome',
        reporterOptions: {
            reportDir: './cypress/reports',
            overwrite: false,
            html: true,
            json: false,
        },
    },
});
