const {expect} = require("@playwright/test");

class ContentAlertPage {
    constructor(page) {
        this.page = page;
    }

    async createCounterAlert(){
        await this.page.getByPlaceholder('Enter name for a new alert (').click();
        await this.page.getByPlaceholder('Enter name for a new alert (').fill('SSO Content Automation UI');
        await this.page.getByRole('combobox').selectOption('content_alert');
        await this.page.getByRole('button', {name: 'Add new alert'}).click();

    }

    async addRules(){
        await this.page.getByRole('button', {name: 'Add new empty rule'}).click();
        await this.page.getByRole('button', {name: 'Add new empty rule'}).click();
        await this.page.getByRole('button', {name: 'Add new empty rule'}).click();
        await this.page.getByRole('button', {name: 'Add new empty rule'}).click();
        await this.page.getByRole('button', {name: 'Add new empty rule'}).click();
        await this.page.locator('#alertDataContainer #imaginary_container').getByRole('combobox').selectOption('JOURNAL_TITLE');
        await this.page.getByRole('button', {name: 'Add new empty rule'}).click();
    }

    async fillRuleDetails(){
        await this.page.getByRole('table').getByRole('combobox').nth(1).selectOption('ARTICLE_ABSTRACT');
        await this.page.getByRole('table').getByRole('combobox').nth(2).selectOption('ARTICLE_BODY');
        await this.page.getByRole('table').getByRole('combobox').nth(3).selectOption('ARTICLE_KEYWORD');
        await this.page.getByRole('table').getByRole('combobox').nth(4).selectOption('ARTICLE_DOI');

        await this.page.getByRole('cell', {name: 'Required Title contains'}).getByRole('textbox').click();
        await this.page.getByRole('cell', {name: 'Required Title contains'}).getByRole('textbox').fill('Title');

        await this.page.getByRole('cell', {name: 'Required Abstract contains'}).getByRole('textbox').click();
        await this.page.getByRole('cell', {name: 'Required Abstract contains'}).getByRole('textbox').fill('significant');

        await this.page.getByRole('cell', {name: 'Required Body contains'}).getByRole('textbox').click();
        await this.page.getByRole('cell', {name: 'Required Body contains'}).getByRole('textbox').fill('body');

        await this.page.getByRole('cell', {name: 'Required Has keyword'}).getByRole('textbox').click();
        await this.page.getByRole('cell', {name: 'Required Has keyword'}).getByRole('textbox').fill('Bioengineering');

        await this.page.getByRole('cell', {name: 'Required Has DOI'}).getByRole('textbox').click();
        await this.page.getByRole('cell', {name: 'Required Has DOI'}).getByRole('textbox').fill('10.1002/pits.22139');

        await this.page.getByPlaceholder('Select a journal by title').click();
        await this.page.getByPlaceholder('Select a journal by title').fill('Psychology in the Schools');
        await this.page.getByText('Psychology in the Schools - (').click();
    }

    async addEmail(){
        await this.page.getByRole('button', {name: 'Add new recipient'}).click();
        await this.page.locator('input[name="email"]').click();
        await this.page.locator('input[name="email"]').fill('csangeeth@wiley.com');

    }

    async testRule(){
        await this.page.locator('.ng-scope > div:nth-child(2) > div > .green').click();
        await this.page.getByRole('button', {name: 'Test rules'}).click();
        await expect(this.page.locator('#alertDataContainer')).toContainText('All changes have been saved');
    }

    async activeAlert(){
        await this.page.locator('.green').first().click();
    }

    async reloadPage(){
        await this.page.waitForTimeout(5000)
        await this.page.getByRole('link', { name: 'Publicity Alerts Tool' }).click();
    }
}

module.exports = ContentAlertPage;
