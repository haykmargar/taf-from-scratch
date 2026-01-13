import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { LoginPage } from '@Pages/login.page';
import { DashboardsPage } from '@Pages/dashboards.page';
import { LaunchPage } from '@Pages/launch.page';
import { SideBar } from '@Pages/components/sidebar-component';

export interface ICustomWorld extends World {
    debug: boolean;
    loginPage?: LoginPage;
    dashboardPage?: DashboardsPage;
    launchPage?: LaunchPage;
    sideBar?: SideBar;
}

export class CustomWorld extends World implements ICustomWorld {
    constructor(options: IWorldOptions) {
        super(options);
    }
    debug = false;
}

setWorldConstructor(CustomWorld);
