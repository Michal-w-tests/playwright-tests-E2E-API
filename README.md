# Playwright Automated Tests 🚀

## 💡 About

This project showcases **API** and **End-to-End (E2E)** tests written using [Playwright](https://playwright.dev/).  
The purpose is to demonstrate skills in automated testing, API interaction (including CRUD flows), and modern E2E patterns using Page Object Model (POM).

---

## 📄 Structure

- `tests/APIMockServer` — Custom **mock API server** tests (CRUD user operations with dynamic data)
- `tests/APIglitch(notWorking)` — Example API tests on a public glitch API (kept as a learning reference)
- `tests/E2EDemoQA` — E2E tests for DemoQA, using Page Object Models

---

## ✅ Technologies

- **TypeScript** for type safety and maintainable structure
- **Playwright** as the main testing framework
- **Page Object Model (POM)** for E2E tests
- **Git** for version control

---

## 🔥 Features

### ✅ API Tests (Mock Server)

- Create, read, update, and delete (CRUD) user data
- Dynamic user creation with random suffix
- Authorization header handling
- Response body and status assertions
- Local JSON database integration (`db.json`)
- **⚠️ Note:** Mock server requires **Node.js version ≥ 20** to work correctly with `json-server`

### 🌐 E2E Tests

- DemoQA Practice Form (full end-to-end flow using POM)
- (Optional) Glitch API examples as learning references

---

## 💻 How to run

1️⃣ **Install dependencies**

```bash
npm install

2️⃣ Start mock server
npm run mock-server

3️⃣ Run tests
npx playwright test

4️⃣ View HTML report
npx playwright show-report


💬 Author
Michal W.
💼 Open to opportunities as an automation tester

📫

⭐️ Bonus
If you like this repo or find it useful, feel free to give it a ⭐️ on GitHub!



