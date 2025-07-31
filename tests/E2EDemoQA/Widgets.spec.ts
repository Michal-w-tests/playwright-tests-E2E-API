import { test,expect } from '@playwright/test'
import { NavigationPage } from './pages/NavigationPage';
import { accordionTexts } from './fixtures/accordionTexts';
import { WidgetsClass } from './pages/Widgets';

test('Widgets', async ({page})=>{
const Navigation = new NavigationPage(page);
const Widgets = new WidgetsClass(page);

    await test.step('Accordian',async ()=>{
        await Navigation.LandToUrl();
        await Navigation.navigateToSection('Widgets','Please select an item from left to start practice.','Accordian');
        await Widgets.Accordian(accordionTexts.WhatisLoremIpsum,accordionTexts.WhereDoesItComeFrom_part1,accordionTexts.WhereDoesItComeFrom_part2,accordionTexts.WhyDoWeUseIt)
    })

})