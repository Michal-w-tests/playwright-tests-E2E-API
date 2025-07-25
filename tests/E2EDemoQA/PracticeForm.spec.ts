import { test, expect } from '@playwright/test';
import { PracticeFormPage } from './pages/PracticeForm';

let url = 'https://demoqa.com/';

export const testData = {
  firstName: 'Jack',
  lastName: 'Black',
  email: 'jack@example.com',
  mobileNR: '1234567890',
  subject1: 'Maths',
  subject2: 'English',
  address: 'Test address',
  state: 'Uttar Pradesh',
  city: 'Agra'
};


test('Practice form fill out', async ({page})=>{

 await test.step('landing on the page and navigating to form', async ()=>{
    await page.goto(url); 
    expect(page.url()).toBe(url); //example of URL assertion

    const pageTitle = await page.title(); //example of title assertion
    expect(pageTitle).toBe('DEMOQA');

    const FormCard = await page.locator('div.card-body:has-text("Forms")'); //example of saving locator into constance and its use, in next step
    await FormCard.click();

    await page.getByText('Please select an item from left to start practice.').isVisible(); //example of another assertion reading the text what should be displayed

    await page.locator('span.text:has-text("Practice Form")').click();
    await page.getByText("Student Registration Form").isVisible(); //verification that form is opened and ready for use
})
await test.step('filling out the form', async()=>{
    //in this step i demonstrate POM by creating "page". In the page i create method for filling out this form and then i call this page into this test. 
    
    const Form = new PracticeFormPage(page); //here im calling the page 
    await Form.fillPersonalInfo(testData);
    await Form.fillSubjects(testData);
    await Form.selectLocation(testData);
    await Form.submitForm();
    await Form.verification(testData);
})

})