const {defineConfig, devices} = require('@playwright/test');

module.exports = defineConfig({
    globalSetup: './utils/globalSetup.js',
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',
    use: {
        trace: 'on-first-retry',
        headless: false,
    },

    projects: [
        {
            name: 'chromium',
            use: {...devices['Desktop Chrome']},
        },
// Uncomment these if you want to test on other browsers or mobile viewports
// {
//     name: 'firefox',
//     use: { ...devices['Desktop Firefox'] },
// },
// {
//     name: 'webkit',
//     use: { ...devices['Desktop Safari'] },
// },
// {
//   name: 'Mobile Chrome',
//   use: { ...devices['Pixel 5'] },
// },
// {
//   name: 'Mobile Safari',
//   use: { ...devices['iPhone 12'] },
// },
// {
//   name: 'Microsoft Edge',
//   use: { ...devices['Desktop Edge'], channel: 'msedge' },
// },
// {
//   name: 'Google Chrome',
//   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
// },
    ],

// Uncomment this section if you need to run a local dev server before tests
// webServer: {
//   command: 'npm run start',
//   url: ENV_URLS[currentEnv],
//   reuseExistingServer: !process.env.CI,
// },
})
;
