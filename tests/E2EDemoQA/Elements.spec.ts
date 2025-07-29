import {test, expect } from '@playwright/test';
import { NavigationPage } from './pages/NavigationPage';
import { ElementsPage } from './pages/ElementsPage';

test('Playing with elements', async ({page})=>{
    const Navigation = new NavigationPage(page);
    const Elements = new ElementsPage(page);

 await test.step('navigation to elements section', async ()=>{
    
    await Navigation.LandToUrl();
    await Navigation.navigateToSection('Elements','Please select an item from left to start practice.','Text Box',);
});
await test.step('Text box section', async ()=>{
    
    await Elements.TextBoxForm('Jozko Ferko','someEmail@email.com','CurrentAdd','PermanentADD')
});
await test.step('Check boxes', async ()=>{
    
    await Navigation.ElementsNavigation('Check Box');
    await Elements.CheckBox()
});

await test.step('Radio buttons', async()=>{
    await Navigation.ElementsNavigation('Radio Button');
    await Elements.RadioButtons();
});

await test.step('Web Tables', async ()=>{
    await Navigation.ElementsNavigation('Web Tables');
    await Elements.WebTablesAddData('Michal','Tester','name@example.com','20','5000','Relax');
    await Elements.EditingWebTable('Edited First Name');
    await Elements.SearchInTable('Cierra','Michal');
    await Elements.DeleteRecord('Cierra')
});

await test.step('Buttons', async ()=>{
    await Navigation.ElementsNavigation('Buttons');
    await Elements.ButtonsOperations();
});

await test.step('Links',async()=>{
    await Navigation.ElementsNavigation('Links');
    await Elements.verifyNewTabOpens('simpleLink','https://demoqa.com');
    await Elements.verifyNewTabOpens('dynamicLink','https://demoqa.com');

    await Elements.verifyApiLinkResponse('created','201','Created');
    await Elements.verifyApiLinkResponse('no-content','204','No Content');
    await Elements.verifyApiLinkResponse('moved','301','Moved Permanently');
    await Elements.verifyApiLinkResponse('bad-request','400','Bad Request');
    await Elements.verifyApiLinkResponse('unauthorized','401','Unauthorized');
    await Elements.verifyApiLinkResponse('forbidden','403','Forbidden');
    await Elements.verifyApiLinkResponse('invalid-url','404','Not Found');

});

await test.step('Upload and Download',async ()=>{
    await Navigation.ElementsNavigation('Upload and Download');
    await Elements.uploadFile('UploadTest.png');
    await Elements.downloadFileAndVerify('sampleFile.jpeg');
});

await test.step('checking dynamic properties behavior', async () => {
    await Navigation.ElementsNavigation('Dynamic Properties');
    await Elements.DynamicProperties(); 
})

})