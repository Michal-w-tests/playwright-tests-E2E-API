import {test, expect } from '@playwright/test';
import { NavigationPage } from './pages/NavigationPage';
import { ElementsPage } from './pages/ElementsPage';

test('Playing with elements', async ({page})=>{
    const Navigation = new NavigationPage(page);
    const Elements = new ElementsPage(page);

 await test.step('navigation to elements section', async ()=>{
    
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

await test.step('Radio buttons', async()=>{
    await Navigation.ElementsNavigation('Radio Button');
    await Elements.RadioButtons();
})

await test.step('Web Tables', async ()=>{
    await Navigation.ElementsNavigation('Web Tables');
    await Elements.WebTablesAddData('Michal','Tester','name@example.com','20','5000','Relax')
})

})