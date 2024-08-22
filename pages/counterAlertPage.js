const {expect} = require("@playwright/test");

class CounterAlertPage {

    constructor(page) {
        this.page = page;
    }

    async createCounterAlert() {
        await this.page.getByPlaceholder('Enter name for a new alert (').click();
        await this.page.getByPlaceholder('Enter name for a new alert (').fill(process.env.ENV.toUpperCase() + ': Counter Alert Automation UI');
        await this.page.getByRole('combobox').selectOption('counter_alert');
        await this.page.getByRole('button', {name: 'Add new alert'}).click();
        await expect(this.page.getByRole('button', {name: 'Add new empty rule'})).toBeVisible();

    }

    async addRules() {
        await this.page.getByRole('button', {name: 'Add new empty rule'}).click();
        await this.page.getByRole('button', {name: 'Add new empty rule'}).click();
        await this.page.getByRole('button', {name: 'Add new empty rule'}).click();
    }

    async fillRuleDetails() {
        await this.page.locator("(//input[@name='journalIssn'])[1]").fill(process.env.JOURNAL_ISSN);
        await this.page.locator("(//input[@name='journalIssn'])[2]").fill(process.env.JOURNAL_ISSN);
        await this.page.locator("(//input[@name='journalIssn'])[3]").fill(process.env.JOURNAL_ISSN);

        await this.page.locator('input[name="count"]').first().click();
        await this.page.locator('input[name="count"]').first().fill('1');
        await this.page.locator('input[name="count"]').nth(1).click();
        await this.page.locator('input[name="count"]').nth(1).fill('1');
        await this.page.locator('input[name="count"]').nth(2).click();
        await this.page.locator('input[name="count"]').nth(2).fill('1');

        await this.page.getByRole('combobox').nth(1).selectOption('EARLY_VIEW');
        await this.page.getByRole('combobox').nth(2).selectOption('IN_ISSUE');
    }

    async addEmail() {
        await this.page.locator("//button[normalize-space()='Add new recipient']").click()
        await this.page.locator("//input[@name='email']").fill(process.env.RECIPIENT);
    }

    async testRule() {
        await this.page.getByRole('button', {name: 'Test rules'}).click();
        await expect(this.page.locator('#alertDataContainer')).toContainText('All changes have been saved');
    }

    async activeAlert() {
        await this.page.locator('.green').click();
        await expect(this.page.locator('form[name="AlertForm"]')).toContainText('NOW ACTIVE');
        await this.page.waitForTimeout(5000)
    }

    async reloadPage() {
        await this.page.getByRole('link', {name: 'Publicity Alerts Tool'}).click();
    }
}

module.exports = CounterAlertPage;
