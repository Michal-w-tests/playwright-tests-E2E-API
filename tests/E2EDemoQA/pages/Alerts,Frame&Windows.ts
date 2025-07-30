import { test,expect, Page, Locator } from '@playwright/test'

export class AlertsFrameWindowsPage {
    readonly page: Page;
    readonly newTabButton:Locator;
    readonly newWindowButton: Locator;
    readonly newWindowMessageButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.newTabButton = page.locator('#tabButton');
        this.newTabButton = page.locator('#windowButton');
        this.newWindowMessageButton = page.locator('#messageWindowButton');
    
    }
    async BrowserWindows(url:string){
        await this.newTabButton.isVisible();

        //New Tab
        const [NewTab] = await Promise.all([
            this.page.waitForEvent('popup'),
            this.newTabButton.click()
        ]);
        await expect(NewTab).toHaveURL(url);
        await NewTab.close();

        //New Window
        const [NewWindow] = await Promise.all([
            this.page.waitForEvent('popup'),
            this.newTabButton.click()
        ]);
        await expect(NewWindow).toHaveURL(url);
        await NewWindow.close();

        //New Window message
        const [NewWindowMessage] = await Promise.all([
             this.page.waitForEvent('popup'),
             this.newWindowMessageButton.click()
        ]);
        await expect(NewWindowMessage.locator('body')).toContainText('Knowledge increases by sharing but not by saving. Please share this website with your friends and in your organization.')
        await NewWindowMessage.close();
    };

}