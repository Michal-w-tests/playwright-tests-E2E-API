import { Locator, Page, expect } from '@playwright/test';

export class PracticeFormPage {
  readonly page: Page;
  readonly FirstName: Locator;
  readonly LastName: Locator;
  readonly Email: Locator;
  readonly GenderMale: Locator;
  readonly GenderFemale: Locator;
  readonly GenderOther: Locator;
  readonly MobileNumber: Locator;
  readonly SubmitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.FirstName = page.getByPlaceholder('First Name');
    this.LastName = page.getByPlaceholder('Last Name');
    this.Email = page.getByPlaceholder('name@example.com');
    this.GenderMale = page.locator('label[for="gender-radio-1"]');
    this.GenderFemale = page.locator('label[for="gender-radio-2"]');
    this.GenderOther = page.locator('label[for="gender-radio-3"]');
    this.MobileNumber = page.getByPlaceholder('Mobile Number');
    this.SubmitButton = page.getByText('Submit')

  }

  async fillForm(firstName: string, lastName: string, email: string, mobileNR: string) {
    await this.FirstName.fill(firstName);
    await this.LastName.fill(lastName);
    await this.Email.fill(email);
    await this.GenderMale.click();
    await this.MobileNumber.fill(mobileNR);

    //await this.SubmitButton.click();

    // Overenie po odoslaní
    //await expect(this.page.getByText('Thanks for submitting the form')).toBeVisible();
  }
}