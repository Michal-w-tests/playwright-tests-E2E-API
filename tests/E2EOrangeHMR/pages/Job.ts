import { Page, Locator, expect } from '@playwright/test';

export class Job {

    private JobButton: Locator;

    constructor(private page:Page){
        //this.JobButton = page.locator('span[class="oxd-topbar-body-nav-tab-item:has-text("Job ")"]')
        this.JobButton = page.locator('span.oxd-topbar-body-nav-tab-item:has-text("Job")');
    }
    async JobMenut(){
        await this.JobButton.click();
        //await expect(this.page.locator('ul[class="oxd-dropdown-menu:has-text("Job Titles")"]')).toBeVisible();
        await expect(this.page.locator('ul.oxd-dropdown-menu:has-text("Job Titles")')).toBeVisible();
        await expect(this.page.locator('ul.oxd-dropdown-menu:has-text("Pay Grades")')).toBeVisible();
        await expect(this.page.locator('ul.oxd-dropdown-menu:has-text("Employment Status")')).toBeVisible();
        await expect(this.page.locator('ul.oxd-dropdown-menu:has-text("Job Categories")')).toBeVisible();
        await expect(this.page.locator('ul.oxd-dropdown-menu:has-text("Work Shifts")')).toBeVisible();
    }
}