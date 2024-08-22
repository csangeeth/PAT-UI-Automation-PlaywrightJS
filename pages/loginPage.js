class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = "//input[@id='username']";
        this.passwordInput = "//input[@id='password']";
        this.loginButton = "//input[@value='Log In']";
    }

    async navigate(){
        await this.page.goto(process.env.WEB_URL);
    }
    async login() {
        const username = process.env.USERNAME;
        const password = process.env.PASSWORD;

        await this.page.fill(this.usernameInput, username);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.loginButton);
    }
}

module.exports = LoginPage;
