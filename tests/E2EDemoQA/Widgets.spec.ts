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
        await Widgets.Accordian(accordionTexts.WhatisLoremIpsum,
                                accordionTexts.WhereDoesItComeFrom_part1,
                                accordionTexts.WhereDoesItComeFrom_part2,
                                accordionTexts.WhyDoWeUseIt)
    });

    await test.step('Auto complete', async()=>{
        await Navigation.Navigation('Auto Complete');
        await Widgets.MultipleColorNames('Red','Green');
        await Widgets.SingleColorName('Black','Green');
    });

    await test.step('Date Picker',async()=>{
        await Navigation.Navigation('Date Picker');
        await Widgets.DatePicker('07/03/2025','06/05/2024');
        await Widgets.DateAndTimePicker('August 3, 2025 8:00 AM','August 2, 2025 8:30 PM');
    });

    await test.step('Slider',async()=>{
        await Navigation.Navigation('Slider');
        await Widgets.Slider('75')
    });

    await test.step('Progress Bar',async()=>{
        await Navigation.Navigation('Progress Bar');
        await Widgets.ProgressBar()
    });

    await test.step('Tabs',async()=>{
        await Navigation.Navigation('Tabs');
        await Widgets.Tabs(accordionTexts.WhatisLoremIpsum,
                            accordionTexts.WhereDoesItComeFrom_part1,
                            accordionTexts.WhereDoesItComeFrom_part2,
                            accordionTexts.WhyDoWeUseIt
        )
    });

    await test.step('Tool Tips',async ()=>{
        await Navigation.Navigation('Tool Tips');
        await Widgets.ToolTips();
    });

})