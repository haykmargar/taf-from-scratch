import { Page, Locator } from '@playwright/test';
import BasePage from '@Pages/base.page';
import { logger } from '@Utilities/logger';

export class LoginPage extends BasePage {
    readonly inputUsername: Locator;
    readonly inputPassword: Locator;
    readonly btnSubmit: Locator;
    readonly invalidUserNamePasswordError: Locator;
    readonly appVersion: Locator;

    constructor(page: Page) {
        super(page);
        this.inputUsername = page.locator('input[placeholder="Login"]');
        this.inputPassword = page.locator('input[placeholder="Password"]');
        this.btnSubmit = page.locator('button[type="submit"]');
        this.invalidUserNamePasswordError = page.locator('.notification-transition-enter-done p');
        this.appVersion = page.locator('.serviceVersionsBlock__versions-list--YrMaL');
    }

    async login(username: string, password: string): Promise<void> {
        await this.appVersion.waitFor({state: 'visible'});
        logger.info(`filling username with: ${username}`);
        await this.inputUsername.fill(username);
        logger.info(`filling password with: ${password}`);
        await this.inputPassword.fill(password);
        logger.info('clicking on login button');
        await this.btnSubmit.click();
    }

    async getErrorMessage() {
        await this.invalidUserNamePasswordError.waitFor({state: 'visible'});
        const message = await this.invalidUserNamePasswordError.textContent();
        logger.info(`following error appeared: ${message}`);
        return message;
    }
}
