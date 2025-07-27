import { test, expect } from '@playwright/test';
import { PracticeFormPage } from './pages/PracticeForm';
import { NavigationPage } from './pages/NavigationPage';

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
    const Navigation = new NavigationPage(page);
    await Navigation.LandToUrl();
    await Navigation.navigateToSection('Forms','Please select an item from left to start practice.','Practice Form',);
})
await test.step('filling out the form', async()=>{ 
    
    const Form = new PracticeFormPage(page);
    await Form.fillPersonalInfo(testData);
    await Form.fillSubjects(testData);
    await Form.selectLocation(testData);
    await Form.submitForm();
    await Form.verification(testData);
})

})