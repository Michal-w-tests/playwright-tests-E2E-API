import { Locator, Page, expect } from '@playwright/test';
let url = 'https://demoqa.com/';

export class NavigationPage {
    readonly page: Page;
    readonly FormCard: Locator;
    readonly FormCardVerifMessage: Locator;
    readonly NavigationToPracticeForm: Locator;


    constructor(page: Page){
        this.page = page;
        this.FormCard = page.locator('div.card-body:has-text("Forms")');
        this.FormCardVerifMessage = page.getByText('Please select an item from left to start practice.');
        this.NavigationToPracticeForm = page.locator('span.text:has-text("Practice Form")');
    }

    async LandToUrl(){
        await this.page.goto(url); 
        expect(this.page.url()).toBe(url); 

        const pageTitle = await this.page.title(); 
        expect(pageTitle).toBe('DEMOQA');
    };

    async NavigationToPForm(){
        
        expect(this.FormCard).toBeVisible();
        await this.FormCard.click();
        expect(this.FormCardVerifMessage).toBeVisible();
        await this.NavigationToPracticeForm.click();
        await this.page.getByText("Student Registration Form").isVisible(); 
    }
}