import { Locator, Page, expect } from '@playwright/test';
let url = 'https://demoqa.com/';

export class NavigationPage {
    readonly page: Page;
    readonly FormCard: Locator;
    readonly FormCardVerifMessage: Locator;
    readonly NavigationToPracticeForm: Locator;


    constructor(page: Page){
        this.page = page;
    
    }

    async LandToUrl(){
        await this.page.goto(url); 
        await expect(this.page).toHaveURL(url);
        await expect(this.page).toHaveTitle('DEMOQA');
    };

    async navigateToSection(sectionName: string, expectedLeftPanelText: string,section: string,) {
        const sectionCard = this.page.locator(`div.card-body:has-text("${sectionName}")`);
        const leftPanelText = this.page.getByText(expectedLeftPanelText);

        await expect(sectionCard).toBeVisible();
        await sectionCard.click({timeout: 10000});
        await expect(leftPanelText).toBeVisible();

        const navLink = this.page.locator(`span.text:has-text("${section}")`);
        await navLink.click();

}

    async Navigation(section:string){
        const navLink = this.page.locator(`span.text:has-text("${section}")`);
        await navLink.first().click();
    }

}