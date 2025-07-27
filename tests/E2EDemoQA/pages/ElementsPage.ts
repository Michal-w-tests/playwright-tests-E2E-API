import { Locator, Page, expect } from '@playwright/test';

export class ElementsPage {
    readonly page: Page;
    readonly UserName: Locator;
    readonly Email: Locator;
    readonly CurrentAddress: Locator;
    readonly PermaAddress: Locator;
    readonly SubmitButton: Locator;


    constructor(page: Page){
        this.page = page;
        this.UserName = page.locator('#userName');
        this.Email = page.locator('input[type="email"]');
        this.CurrentAddress = page.locator('#currentAddress');
        this.PermaAddress = page.locator('#permanentAddress');
        this.SubmitButton = page.locator('#submit')
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

    }


}