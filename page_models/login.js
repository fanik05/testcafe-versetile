import { Selector, t } from 'testcafe';

class Login {
    constructor() {
        this.title = Selector('title');
        this.emailInput = Selector('input[type="email"]');
        this.passwordInput = Selector('input[type="password"]');
        this.buttons = Selector('button');
        this.headerLabel = Selector('.description');  
        this.emailLabel = Selector('.Input ').child('label').nth(0);
        this.emailField = Selector('input[type="email"]');
        this.passwordLabel = Selector('.Input ').child('label').nth(1);
        this.passwordField = Selector('input[type="password"]');
        this.loginButton = Selector('.buttons').child('button').nth(0);
        this.forgotPasswordButton = Selector('.buttons').child('button').nth(1);
        this.registerButton = Selector('button').withText('Register now');
        this.localizeWidget = Selector('#localize-widget');
        this.loginError = Selector('.header');
        this.poweredByText = Selector('#localize-powered-by');
    }

    async clearEmail () {
        await t
            .click(this.emailField)
            .pressKey('ctrl+a delete');
    }

    async clearPassword () {
        await t
            .click(this.passwordField)
            .pressKey('ctrl+a delete');
    }
}

export default new Login();