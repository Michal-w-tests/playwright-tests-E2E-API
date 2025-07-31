import { expect, Page, Locator } from '@playwright/test'

export class PageName {
    readonly page: Page;
    //readonly SomeButton: Locator;

    constructor(page: Page){
        this.page = page;
        //this.SomeButton = page.locator('locatorExample')
    }

    async Methods(){
        
    }

}