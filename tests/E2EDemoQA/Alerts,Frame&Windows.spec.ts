import { test,expect } from '@playwright/test'
import { NavigationPage } from './pages/NavigationPage';
import { AlertsFrameWindowsPage } from './pages/Alerts,Frame&Windows';

test('Alerts,Frame and Windows',async({page})=>{
    const Navigation = new NavigationPage(page);
    const AFW = new AlertsFrameWindowsPage(page);

    await test.step('Browser windows', async ()=>{
        await Navigation.LandToUrl();
        await Navigation.navigateToSection('Alerts, Frame & Windows','Please select an item from left to start practice.','Browser Windows')
        await AFW.BrowserWindows('https://demoqa.com/sample')
    });

    await test.step('Alerts',async()=>{
        await Navigation.Navigation('Alerts');
        await AFW.Alert();
        await AFW.DelayAlert();
        await AFW.ConfirmBoxAccept('Ok');
        await AFW.ConfirmBoxDissmiss('Cancel');
        await AFW.PromptAlert('Michal')
    });


    await test.step('Frame',async()=>{
        await Navigation.Navigation('Frames');
        await AFW.Frame1();
        await AFW.Frame2();
    })
})