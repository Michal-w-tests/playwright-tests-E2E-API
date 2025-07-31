import { test,expect, Page, Locator } from '@playwright/test'


export class WidgetsClass {
    readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

    async Accordian(text1:string,text2a:string,text2b:string,text3:string){

        const Text1 = await this.page.locator('#section1Content > p');
        await expect(Text1).toContainText(text1)

        const section2 = await this.page.locator('#section2Heading');
        await section2.click();
        const Text2 = await this.page.locator('#section2Content > p');
        await expect(Text2.first()).toContainText(text2a);
        await expect(Text2.last()).toContainText(text2b)

        const section3 =  await this.page.locator('#section3Heading');
        await section3.click();
        const Text3 = await this.page.locator('#section3Content > p');
        await expect(Text3).toBeVisible();
        await expect(Text3).toContainText(text3);
        await expect(Text2.first()).not.toBeVisible();
        await expect(Text2.last()).not.toBeVisible();
        await expect(Text1).not.toBeVisible();

        await section3.click();
        await expect(Text3).not.toBeVisible();


    }

}