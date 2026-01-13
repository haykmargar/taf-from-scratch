import { Locator, Page } from '@playwright/test';
import BaseComponent from '@Pages/components/base-component';

export class SideBar extends BaseComponent {
    readonly launchesButton: Locator;
    readonly projectsButton: Locator;

    constructor(page: Page) {
        super(page);
        this.launchesButton = this.page.locator('div[class*="sidebarButton__sidebar-nav-btn"] a[href*="/launches"]');
        this.projectsButton = this.page.locator('div[class*="sidebar__main-block"] div[class*="projectSelector__project-selector"]');
    }
}
