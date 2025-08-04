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
  readonly Subjects: Locator;
  readonly SportsHobby: Locator;
  readonly UploadPicture: Locator;
  readonly Textarea: Locator;
  readonly State:Locator;
  readonly City:Locator;
  readonly CloseFormButton: Locator;

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
    this.City = page.locator('#city');
    this.CloseFormButton = page.locator('#closeLargeModal');

  }

  async fillPersonalInfo(data: {firstName: string, lastName: string, email: string, mobileNR: string}){
    await this.FirstName.fill(data.firstName);
    await this.LastName.fill(data.lastName);
    await this.Email.fill(data.email);
    await this.GenderMale.click();
    await this.MobileNumber.fill(data.mobileNR);
  };

  async fillSubjects(data: {subject1: string,subject2: string}){
    await this.Subjects.click();
    await this.Subjects.fill(data.subject1);
    await this.Subjects.press('Enter');
    await this.Subjects.fill(data.subject2);
    await this.Subjects.press('Enter');
    await this.SportsHobby.click();
    await this.UploadPicture.setInputFiles('tests/E2EDemoQA/fixtures/UploadTest.png');
  };

  async selectLocation(data: {address: string,state: string,city:string}){
    await this.Textarea.fill(data.address);
    
    await this.State.click();
    const stateOption = this.page.locator(`div[id^=react-select][id*=option]:has-text("${data.state}")`);
    await stateOption.waitFor({ state: 'visible' });
    await stateOption.click();
    
    await this.City.click();
    const cityOption = this.page.locator(`div[id^=react-select][id*=option]:has-text("${data.city}")`);
    await cityOption.waitFor({state:'visible'});
    await cityOption.click()
    
    
  };

  async submitForm(){
    await this.SubmitButton.click();
    // Overenie po odoslaní
    await expect(this.page.getByText('Thanks for submitting the form')).toBeVisible();
  };

  async verification(data: {firstName: string, lastName: string, email: string, mobileNR: string,subject1: string,subject2: string,state: string,city:string}){
    await expect(this.page.getByRole('cell', { name: `${data.firstName} ${data.lastName}` })).toBeVisible();
    await expect(this.page.getByRole('cell', { name: data.email })).toBeVisible();
    await expect(this.page.getByRole('cell', { name: 'Male' })).toBeVisible();
    await expect(this.page.getByRole('cell', { name: data.mobileNR })).toBeVisible();
    await expect(this.page.getByRole('cell', { name: `${data.subject1}, ${data.subject2}` })).toBeVisible();
    await expect(this.page.getByRole('cell', { name: 'UploadTest.png' })).toBeVisible();
    await expect(this.page.getByRole('cell', { name: `${data.state} ${data.city}` })).toBeVisible();

    await this.CloseFormButton.click();
  }
}