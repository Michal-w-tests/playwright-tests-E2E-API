# Playwright Automated Tests 🚀

## 💡 About

This project showcases **API** and **End-to-End (E2E)** tests written using [Playwright](https://playwright.dev/).  
The purpose is to demonstrate skills in automated testing, API interaction, dynamic token handling, and modern E2E testing patterns using Page Object Model (POM).

---

## 📄 Structure
tests/
├── API/
│ ├── helpers/ # Helper functions (e.g., dynamic token generation, create/update/delete order)
│ ├── collectionDynamicToken.spec.ts
│ ├── functionsTest.spec.ts
│ └── other API tests...
├── E2EDemoQA/
│ ├── pages/ # Page Object Models for DemoQA practice form
│ ├── PracticeForm.spec.ts
│ └── other E2E tests...


---

## ✅ Technologies

- **TypeScript** for type safety and clean structure
- **Playwright** as the main testing framework
- **Page Object Model (POM)** for E2E tests
- **GitHub** for version control

---

## 🔥 Features

### ✅ API Tests

- Dynamic token generation (with random email)
- Create, update, display, and delete orders
- Assertions for status codes and responses
- Verification of order deletion

### 🌐 E2E Tests

- Automated login and state preservation (example: OrangeHRM)
- DemoQA Practice Form example:
  - Step-by-step navigation
  - Assertions on URL and page title
  - Form filling using POM

---

## 💻 How to run

1️⃣ **Install dependencies**

```bash
npm install
npx playwright test
npx playwright test tests/API/functionsTest.spec.ts
npx playwright show-report
npx playwright test tests/E2EDemoQA/PracticeForm.spec.ts --headed

💬 Author
Michal Wagner
💼 Open to opportunities as an automation tester

📫 

⭐️ Bonus
If you like this repo or find it useful, feel free to give it a ⭐️ on GitHub!

Happy testing! 🚀


