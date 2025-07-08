import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: 'html',
  use: {
    actionTimeout: 5000,
    trace: 'on',
    screenshot: 'only-on-failure',
    baseURL: 'https://example.com',

    // 💥 Natívne veľké okno
    viewport: null,
    headless: false,
    launchOptions: {
      args: ['--start-maximized'],
    },
  },
  projects: [
    {
      name: 'chromium',
      use: {
        // Žiadne devices! Takto to berie natívne
        viewport: null,
        launchOptions: {
          args: ['--start-maximized'],
        },
      },
    },
  ],
});
