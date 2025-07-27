import {test, expect } from '@playwright/test';
import { NavigationPage } from './pages/NavigationPage';
import { ElementsPage } from './pages/ElementsPage';

test('Practice form fill out', async ({page})=>{

 await test.step('landing on the page and navigating to form', async ()=>{
    const Navigation = new NavigationPage(page);
    await Navigation.LandToUrl();
    await Navigation.navigateToSection('Elements','Please select an item from left to start practice.','Text Box',);
})
await test.step('Text box section', async ()=>{
    const TextBox = new ElementsPage(page);
    
})

})