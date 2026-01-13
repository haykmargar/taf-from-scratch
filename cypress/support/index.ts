import locators from '@Cypress/utils/locators';

export {
    locators,
};

declare global {
    namespace Cypress {
        interface Chainable {
            login(username: string, password: string): Chainable<JQuery<HTMLElement>>;
            openRP(): void;
        }
    }
}
