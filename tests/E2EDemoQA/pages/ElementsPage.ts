import { Locator, Page, expect } from '@playwright/test';

export class ElementsPage {
    readonly page: Page;
    readonly UserName: Locator;
    readonly Email: Locator;
    readonly CurrentAddress: Locator;
    readonly PermaAddress: Locator;
    readonly SubmitButton: Locator;
    readonly home: Locator;


    constructor(page: Page){
        this.page = page;
        this.UserName = page.locator('#userName');
        this.Email = page.locator('input[type="email"]');
        this.CurrentAddress = page.locator('#currentAddress');
        this.PermaAddress = page.locator('#permanentAddress');
        this.SubmitButton = page.locator('#submit');
        this.home = page.locator('span.rct-title:has-text("Home")');
    }

    async TextBoxForm(userName: string,email: string,CurrentAdd: string,permanentAdd: string){
        await this.UserName.fill(userName);
        await this.Email.fill(email);
        await this.CurrentAddress.fill(CurrentAdd);
        await this.PermaAddress.fill(permanentAdd);
        await this.SubmitButton.click();
        
        await expect(this.page.locator('#output #name')).toHaveText(`Name:${userName}`);
        await expect(this.page.locator('#output #email')).toHaveText(`Email:${email}`);
        await expect(this.page.locator('#output #currentAddress')).toHaveText(`Current Address :${CurrentAdd}`);
        await expect(this.page.locator('#output #permanentAddress')).toHaveText(`Permananet Address :${permanentAdd}`)
    };

    async CheckBox(){
        
        await this.home.click();
        await expect(this.page.locator('#result')).toContainText('You have selected :')
        await this.page.locator('button[aria-label="Toggle"]').click();
        await expect(this.page.locator('span.rct-title:has-text("Desktop")')).toBeVisible();
        await expect(this.page.locator('span.rct-title:has-text("Documents")')).toBeVisible();
        await expect(this.page.locator('span.rct-title:has-text("Downloads")')).toBeVisible();

        const downloadsCheckboxIcon = this.page.locator('label[for="tree-node-downloads"] .rct-icon').first();
        await expect(downloadsCheckboxIcon).toHaveClass(/rct-icon-check/);

        await downloadsCheckboxIcon.click();
        await expect(downloadsCheckboxIcon).toHaveClass(/rct-icon-uncheck/);

        await this.page.locator('button[aria-label="Toggle"]').nth(3).click();
        await expect(this.page.locator('span.rct-title:has-text("Excel File.doc")')).toBeVisible();
        
        const excelCheckboxIcon = this.page.locator('label[for="tree-node-excelFile"] .rct-icon').first();
        await expect(excelCheckboxIcon).toHaveClass(/rct-icon-uncheck/);
    }


}