import { test,expect, Page, Locator } from '@playwright/test'
import { Cipheriv } from 'crypto';


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
    };

    async MultipleColorNames(color1:string,color2: string){
        const dropdown = await this.page.locator('#autoCompleteMultipleInput');
        await dropdown.fill(color1);
       
        await this.page.locator('.auto-complete__option', { hasText: color1 }).click();
        await dropdown.fill(color2);
        await this.page.locator('.auto-complete__option', { hasText: color2 }).click();
        
        const colors = await this.page.locator('.auto-complete__multi-value__label').allTextContents();
        await expect(colors).toEqual([color1,color2]);

        //removing first (red) color... 
        await this.page.locator('.css-19bqh2r').nth(0).click()
        await expect(this.page.locator(`.auto-complete__multi-value__label:has-text("${color1}")`)).toHaveCount(0);
        

    };

    async SingleColorName(color1:string,color2: string){
        const dropdown = await this.page.locator('#autoCompleteSingleInput');
        await dropdown.fill(color1);

        await this.page.locator('.auto-complete__menu', { hasText: color1 }).click();
        await expect(this.page.locator('.css-1uccc91-singleValue').first()).toHaveText(color1)
        
        await dropdown.fill(color2);
        await this.page.locator('.auto-complete__menu', { hasText: color2 }).click();
        await expect(this.page.locator('.css-1uccc91-singleValue').first()).toHaveText(color2)
    };

    async DatePicker(date1:string, date2:string){
        const date = this.page.locator('#datePickerMonthYearInput');
        await date.fill(date1);
        await date.press('Enter');
        await expect(date).toHaveValue(date1);

        await date.fill(date2);
        await date.press('Enter');
        await expect(date).toHaveValue(date2);

        await date.clear();
        await expect(date).toHaveValue('');

    };

    async DateAndTimePicker(time:string,newTime:string){
        const DateAndTime = this.page.locator('#dateAndTimePickerInput');
        await DateAndTime.fill(time)
        await DateAndTime.press('Enter');
        await expect(DateAndTime).toHaveValue(time);

        await DateAndTime.fill(newTime);
        await DateAndTime.press('Enter');
        await expect(DateAndTime).toHaveValue(newTime)

        await DateAndTime.clear()
        await expect(DateAndTime).toHaveValue('');
        await this.page.locator('h1').click();
    };

    async Slider(value:string){
        const slider = this.page.locator('input[type="range"]');
        const sliderValue = this.page.locator('#sliderValue');
        await slider.fill(value);
        await expect(sliderValue).toHaveValue(value)
        
    };

    async ProgressBar(){
        const button = this.page.locator('#startStopButton');
        await button.click();
        await this.page.waitForTimeout(2000);
        await button.click();
        await this.page.waitForTimeout(1000);
        const valueNow = await this.page.locator('.progress-bar').getAttribute('aria-valuenow');
        expect(Number(valueNow)).toBeGreaterThan(18);
        expect(Number(valueNow)).toBeLessThan(22);
    }

}