import { Page, Locator } from '@playwright/test';

export class dashboard {
    
    
    private TopRightCornerButton : Locator;
    private Logout : Locator;
    private AssignLeave :Locator;

    constructor (private page: Page ) {
        this.page = page;
        this.TopRightCornerButton = page.locator('span[class="oxd-userdropdown-tab"]');
        this.Logout = page.getByRole('menuitem',{name: "Logout"});
        this.AssignLeave = page.locator('button[title="Assign Leave"]')
    }

    async logout() {

        await this.TopRightCornerButton.click();
        await this.Logout.click()
    }

    async assignLeave(){
        await this.AssignLeave.click();
    }
}