import { Page, BrowserContext, Browser } from '@playwright/test';
import { Logger } from 'winston';
export const fixture =  {
    browser: undefined as Browser,
    context: undefined as BrowserContext,
    page:  undefined as Page,
    logger: undefined as Logger
};
