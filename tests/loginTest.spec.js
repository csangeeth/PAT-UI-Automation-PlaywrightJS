const {test, expect} = require('@playwright/test');
const LoginPage = require('../pages/loginPage');
const CounterAlertPage = require('../pages/counterAlertPage');
const ContentAlertPage = require('../pages/contentAlertPage');

const env = process.env.ENV || 'qa';

test.describe(`${env.toUpperCase()} Environment Tests`, () => {
    test.beforeEach(async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login();
    });

    test.afterEach(async ({page}) => {
        await page.locator("//span[@alt='Logout']").click();
        await expect(page.getByRole('heading')).toContainText('Logging out');
        await page.getByRole('button', { name: 'Yes' }).click();
    });


    test(`Counter Alert Creation on ${env.toUpperCase()} environment`, async ({page}) => {
        const counterAlertPage = new CounterAlertPage(page)
        await counterAlertPage.createCounterAlert();
        await counterAlertPage.addRules();
        await counterAlertPage.fillRuleDetails();
        await counterAlertPage.addEmail();
        await counterAlertPage.testRule();
        await counterAlertPage.activeAlert();
        await counterAlertPage.reloadPage();
    });

    test(`Content Alert Creation on ${env.toUpperCase()} environment`, async ({page}) => {
        const contentAlertPage = new ContentAlertPage(page)
        await contentAlertPage.createCounterAlert();
        await contentAlertPage.addRules();
        await contentAlertPage.fillRuleDetails();
        await contentAlertPage.addEmail();
        await contentAlertPage.testRule();
        await contentAlertPage.activeAlert();
        await contentAlertPage.reloadPage();
    });
});
