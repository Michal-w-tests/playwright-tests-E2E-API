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

        await downloadsCheckboxIcon.click({timeout:10000});
        await expect(downloadsCheckboxIcon).toHaveClass(/rct-icon-uncheck/);

        await this.page.locator('button[aria-label="Toggle"]').nth(3).click();
        await expect(this.page.locator('span.rct-title:has-text("Excel File.doc")')).toBeVisible();
        
        const excelCheckboxIcon = this.page.locator('label[for="tree-node-excelFile"] .rct-icon').first();
        await expect(excelCheckboxIcon).toHaveClass(/rct-icon-uncheck/);
    }

    async RadioButtons(){
        
        await expect(this.page.locator('h1.text-center')).toHaveText("Radio Button");
        await this.page.locator('label[for="yesRadio"]').click();
        await expect(this.page.locator('#yesRadio')).toBeChecked();
        await expect(this.page.locator('span.text-success')).toHaveText('Yes');

        await this.page.locator('label[for="impressiveRadio"]').click();
        await expect(this.page.locator('#impressiveRadio')).toBeChecked();
        await expect(this.page.locator('span.text-success')).toHaveText('Impressive');

        await expect(this.page.locator('#noRadio')).toHaveClass(/disabled/);
    }

    async WebTablesAddData(FirstName:string, LastName:string,Email:string, age:string, salary:string, department:string){

        await expect(this.page.locator('h1.text-center')).toBeVisible();
        await this.page.locator('#addNewRecordButton').click();

        await this.page.locator('input[placeholder="First Name"]').fill(FirstName);
        await expect(this.page.locator('input[placeholder="First Name"]')).toHaveValue(FirstName);

        await this.page.locator('#lastName').fill(LastName)
        await expect(this.page.locator('#lastName')).toHaveValue(LastName);

        await this.page.locator('#userEmail').fill(Email);
        await expect(this.page.locator('#userEmail')).toHaveValue(Email);

        await this.page.locator('#age').fill(age);
        await expect(this.page.locator('#age')).toHaveValue(age);

        await this.page.locator('#salary').fill(salary);
        await expect(this.page.locator('#salary')).toHaveValue(salary);

        await this.page.locator('#department').fill(department);
        await expect(this.page.locator('#department')).toHaveValue(department);

        await this.SubmitButton.click();
        await expect(this.page.locator('div.rt-td:has-text("Relax")')).toBeVisible();
        
    }

    async EditingWebTable(EditedName:string){
        await this.page.locator('#edit-record-2').click();
        await this.page.locator('#firstName').fill(EditedName);
        await this.SubmitButton.click();
        await expect(this.page.locator(`div.rt-td:has-text("${EditedName}")`)).toBeVisible()
    }

    async SearchInTable(Name:string, AnotherRecord:string){
        await this.page.locator('#searchBox').fill(Name);
        await expect(this.page.locator(`div.rt-td:has-text("${Name}")`).first()).toBeVisible();
        await expect(this.page.locator(`div.rt-td:has-text("${AnotherRecord}")`)).not.toBeVisible();
        await this.page.locator('#searchBox').clear()
    }
    async DeleteRecord(Name:string){
        await this.page.locator('#delete-record-1').click();
        await expect(this.page.locator(`div.rt-td:has-text("${Name}")`)).not.toBeVisible();

    }

}