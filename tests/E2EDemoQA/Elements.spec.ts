import {test, expect } from '@playwright/test';
import { NavigationPage } from './pages/NavigationPage';
import { ElementsPage } from './pages/ElementsPage';

test('Practice form fill out', async ({page})=>{
    const Navigation = new NavigationPage(page);
    const Elements = new ElementsPage(page);

 await test.step('landing on the page and navigating to form', async ()=>{
    
    await Navigation.LandToUrl();
    await Navigation.navigateToSection('Elements','Please select an item from left to start practice.','Text Box',);
})
await test.step('Text box section', async ()=>{
    
    await Elements.TextBoxForm('Jozko Ferko','someEmail@email.com','CurrentAdd','PermanentADD')
})
await test.step('Check boxes', async ()=>{
    
    await Navigation.ElementsNavigation('Check Box');
    await Elements.CheckBox()
})

})