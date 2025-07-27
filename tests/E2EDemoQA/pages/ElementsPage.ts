import { Locator, Page, expect } from '@playwright/test';

export class ElementsPage {
    readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }


}