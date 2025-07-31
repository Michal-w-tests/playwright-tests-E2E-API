import { test,expect, Page, Locator } from '@playwright/test'
import { error } from 'console';
import { TIMEOUT } from 'dns';

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

    async Alert(){
        //click button to see alert
        const AlertButton = this.page.locator('#alertButton');

                                    // set listener before click
        this.page.once('dialog', async (dialog) => {
        expect(dialog.message()).toBe('You clicked a button');  // text validation
        await dialog.accept(); // confirms alert (press OK)
        });

        await AlertButton.click()
        };

    async DelayAlert(){
        const TimeAlertButton = this.page.locator('#timerAlertButton');

        const dialog = await Promise.all([
            this.page.waitForEvent('dialog',{timeout: 7000}),
            await TimeAlertButton.click()
        ]).then(([dialog]) => dialog);
        
        expect(dialog.message()).toBe('This alert appeared after 5 seconds');
        await dialog.accept();
    };

    async ConfirmBoxAccept(answer:string){
        const ConfirmButton = this.page.locator('#confirmButton');
        
        this.page.once('dialog', async(dialog)=>{
            await dialog.accept()
        });
        await ConfirmButton.click();
        const confirm1 = this.page.locator('#confirmResult');
        await expect(confirm1).toContainText(answer);

    };

    async ConfirmBoxDissmiss(answer:string){
        const ConfirmButton = this.page.locator('#confirmButton');

        this.page.once('dialog',async(dialog)=>{
            await dialog.dismiss()
        });
        await ConfirmButton.click();
        const confirm2 = this.page.locator('#confirmResult');
        await expect(confirm2).toContainText(answer);
    };

    async PromptAlert(inputText:string){
        const PromptButton = this.page.locator('#promtButton');

        this.page.once('dialog',async(dialog)=>{
            await expect(dialog.message()).toBe('Please enter your name');
            await dialog.accept(inputText);
        });
        await PromptButton.click();
        const Result =  this.page.locator('#promptResult')
        await expect(Result).toContainText(inputText)
    };

    async Frame1(){
       const ElementHandle = await this.page.locator('#frame1').elementHandle();
       
       if (!ElementHandle){
            throw new Error ('Frame element #frame1 not found');
       }
       
       const frame = await ElementHandle.contentFrame();

       if (!frame){
            throw new Error ('Could not get contentFrame from element #frame1');
       }

       await expect(frame.locator('h1')).toHaveText('This is a sample page');
    }

    async Frame2(){
        const frameHandling = await this.page.locator('#frame2').elementHandle();
        if (!frameHandling){
            throw new Error ('ups, something went wrong')
        }
        const frame = await frameHandling.contentFrame();
        if (!frame){
            throw new Error ('this is really bad situation')
        }
        await expect(frame.locator('#sampleHeading')).toHaveText('This is a sample page')
    }

}