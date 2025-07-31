import { test,expect } from '@playwright/test'
import { NavigationPage } from './pages/NavigationPage';

test('Widgets', async ({page})=>{
const Navigation = new NavigationPage(page);

    await test.step('Accordian',async ()=>{
        await Navigation.LandToUrl();
        await Navigation.navigateToSection('Widgets','Please select an item from left to start practice.','Accordian')
    })

})