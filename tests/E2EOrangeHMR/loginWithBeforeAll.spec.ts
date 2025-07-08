import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { dashboard } from './pages/DashBoard';
import { Admin } from './pages/Admin';
import { Job } from './pages/Job';





test.beforeAll('login', async ({browser})=>{
    const context = await browser.newContext(); //browser.newContext() je metoda ktora nam vytvory nas novy browser objekt ktory posluzi na uchovanie prihlasenia
    const page = await context.newPage(); // po ulozeni objektu do konstatnty context , si vytvorime nasu novu page ktora bude spolupracovat s objektom browser 
    


    const Login = new LoginPage(page);
    await Login.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await Login.login('Admin','admin123')

    // 💥 Počkaj na dashboard URL
    await page.waitForURL('**/dashboard/**');

     // Save storage (cookies + local storage) do súboru
     await context.storageState({ path: 'tests/fixtures/state.json' });

     await page.close();

})

test.skip('dashboard check after beforeAll login', async ({browser})=>{
    const context = await browser.newContext({ storageState: 'tests/fixtures/state.json'})
    const page = await context.newPage();
    const Dashboard = new dashboard(page);
    
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
    await expect(page).toHaveURL(/dashboard/);
    //await expect(page.locator('.oxd-text.oxd-text--p:has-text("Time at Work")')).toBeVisible();
    await expect(page.locator('.oxd-text.oxd-text--p').filter({hasText: 'Time at Work'})).toBeVisible();

    await Dashboard.assignLeave()
    await page.locator('input[placeholder="Type for hints..."]').type('Mark',{delay:200})
    await page.waitForTimeout(2000);
    await page.getByText('Mark Tom Kowalski').click();
    await page.locator('div[class="oxd-select-wrapper"]').click();
    await page.getByText('CAN - Bereavement').click();
    await page.locator('input[placeholder="yyyy-dd-mm"]').nth(0).fill('2025-15-07');
    //await page.locator('body').click();
    await page.locator('input[placeholder="yyyy-dd-mm"]').nth(0).press('Tab');
    await page.waitForTimeout(2000)
    await page.locator('input[placeholder="yyyy-dd-mm"]').nth(1).type('2025-15-08');
    await expect(page.locator('input[placeholder="yyyy-dd-mm"]').nth(1)).toHaveValue('2025-15-08');
    await page.waitForTimeout(2000)
    await page.locator('button[type="submit"]').click()
    await page.getByRole('button',{name: 'Cancel'}).click()
    //await context.close();

})

test('check sections',async ({browser})=>{
    const context = await browser.newContext({ storageState: 'tests/fixtures/state.json'})
    const page = await context.newPage();
    const admin = new Admin(page);
    const job = new Job(page);

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers')
    await expect(page).toHaveURL(/admin\/viewSystemUsers/)
    await admin.UserSelect('Admin');
    await admin.StatusSelect('Enabled');

    await job.JobMenut();

    //await context.close()
})
