import { validProject } from '@Resources/constants';

const locators = {
    login: 'input[placeholder="Login"]',
    passwordInput: 'input[placeholder="Password"]',
    submitButton: 'button[type="submit"]',
    dashboardTitle: 'span[title="All Dashboards"]',
    invalidUserNamePasswordError: '.notification-transition-enter-done p',
    projectsButton: 'div[class*="sidebar__main-block"] div[class*="projectSelector__project-selector"]',
    actualProjectButton: `span[title="${validProject}"]`,
    launchesButton: 'div[class*="sidebarButton__sidebar-nav-btn"] a[href*="/launches"]',
    dashboardButton: `div[class*="sidebar__sidebar-btn"] a[href="#${validProject}/dashboard"]`,
    actualDashboardLocator: `div[class*="gridRow__grid-row"] a[href*="#${validProject}/dashboard/"]`,
    widgetDragAndDropHandler: 'div[class*="widgetHeader__widget-name-block"]',
};

export default locators;
