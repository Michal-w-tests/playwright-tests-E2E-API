import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { dashboard } from '../pages/DashBoard';

test.beforeEach('login', async ({page})=>{
    const Login = new LoginPage(page);
    await Login.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await Login.login('Admin','admin123')

})

test('Test of login with login page object', async ({page})=>{

    await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index")
})

test.afterEach('logout', async ({page})=>{
    const dashboardPage = new dashboard(page);
    await dashboardPage.logout();

    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
})