import { Locator, Page, expect } from '@playwright/test';
import { asyncWrapProviders } from 'async_hooks';

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
  readonly Subjects: Locator;
  readonly SportsHobby: Locator;
  readonly UploadPicture: Locator;
  readonly Textarea: Locator;
  readonly State:Locator;
  readonly City:Locator;

  constructor(page: Page) {
    this.page = page;
    this.FirstName = page.getByPlaceholder('First Name');
    this.LastName = page.getByPlaceholder('Last Name');
    this.Email = page.getByPlaceholder('name@example.com');
    this.GenderMale = page.locator('label[for="gender-radio-1"]');
    this.GenderFemale = page.locator('label[for="gender-radio-2"]');
    this.GenderOther = page.locator('label[for="gender-radio-3"]');
    this.MobileNumber = page.getByPlaceholder('Mobile Number');
    this.SubmitButton = page.getByText('Submit');
    this.Subjects = page.locator('#subjectsInput');
    this.SportsHobby = page.getByText('Sports');
    this.UploadPicture = page.locator('#uploadPicture');
    this.Textarea = page.locator('textarea[placeholder="Current Address"]');
    this.State = page.locator('#state');
    this.City = page.locator('#city')

  }

  async fillForm(firstName: string, lastName: string, email: string, mobileNR: string, subject1: string,subject2: string,address: string,state: string,city:string) {
    await this.FirstName.fill(firstName);
    await this.LastName.fill(lastName);
    await this.Email.fill(email);
    await this.GenderMale.click();
    await this.MobileNumber.fill(mobileNR);
    await this.Subjects.click();
    await this.Subjects.fill(subject1);
    await this.Subjects.press('Enter');
    await this.Subjects.fill(subject2);
    await this.Subjects.press('Enter');
    await this.SportsHobby.click();
    await this.UploadPicture.setInputFiles('tests/E2EDemoQA/fixtures/UploadTest.png');
    await this.Textarea.fill(address);
    await this.State.click();
    await this.page.getByText(state).first().click();
    await this.City.click();
    await this.page.getByText(city).first().click();



    //await this.SubmitButton.click();

    // Overenie po odoslaní
    //await expect(this.page.getByText('Thanks for submitting the form')).toBeVisible();
  }
}