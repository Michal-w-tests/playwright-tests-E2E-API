import { Page, Locator, expect } from '@playwright/test';

export class Admin {
    private UserRole: Locator;
    private Status: Locator;
    private SubmitButton: Locator;

    constructor (private page: Page) {
    this.UserRole = page.locator('div[class="oxd-select-wrapper"]').nth(0);
    this.Status = page.locator('div[class="oxd-select-wrapper"]').nth(1);
    this.SubmitButton = page.locator('button[type="submit"]');
    }
    
    async UserSelect(role:string){
    await this.UserRole.click();
    await this.page.getByRole('option', { name: role }).click();
    await expect(this.UserRole).toHaveText(role);
    }
    async StatusSelect(status:string){
        await this.Status.click();
        await this.page.getByRole('option', { name: status }).click();
        await expect(this.Status).toHaveText(status);
    }
}