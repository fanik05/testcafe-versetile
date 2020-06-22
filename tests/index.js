import { ClientFunction } from 'testcafe';
import { Role } from 'testcafe';
import loginModel from '../page_models/login';
import dashboardModel from '../page_models/dashboard';
import resetModel from '../page_models/reset';
import { validEmail, validPassword, invalidEmail, invalidPassword } from '../user_credentials/dev_credentials';

const validUser = Role('https://member.dev.clubswan.com/', async t => {
    await t
        .typeText(loginModel.emailField, validEmail)
        .typeText(loginModel.passwordField, validPassword)
        .click(loginModel.loginButton)
        .expect(getPageUrl()).eql('https://member.dev.clubswan.com/dashboard')
        .expect(dashboardModel.welcomeBanner.innerText).contains('Welcome to Club Swan');
});

const invalidUser = Role('https://member.dev.clubswan.com/', async t => {
    await t
        .typeText(loginModel.emailField, invalidEmail)
        .typeText(loginModel.passwordField, invalidPassword)
        .click(loginModel.loginButton)
        .expect(loginModel.loginError.innerText).eql('Login failed');
});

const getPageUrl = ClientFunction(() => window.location.href);


fixture `Club Swan Login Page`
    .meta('fixtureID', 'f-0001')
    .meta({author: 'Fatin', creationDate: '19/06/2020'})
    .page `https://member.dev.clubswan.com/`
    .beforeEach( async t => {
        await t
            .maximizeWindow();
    });

test
    .meta('testID', 't-0001')
    ('Check if the page title is correct', async t => {
        await t
            .expect(loginModel.title.innerText).eql('Club Swan');
    });

test
    .meta('testID', 't-0002')
    ('Check if the page URL is valid', async t => {
        await t
            .expect(getPageUrl()).eql('https://member.dev.clubswan.com/');
    });

test
    .meta('testID', 't-0003')
    ('Check if all input fields and buttons are present', async t => {
        await t
            .expect(loginModel.emailInput.exists).ok()
            .expect(loginModel.passwordInput.exists).ok()
            .expect(loginModel.buttons.count).eql(3);
    });

test
    .meta('testID', 't-0004')
    ('Check if all the labels are correct', async t => {
        await t
            .expect(loginModel.headerLabel.innerText).eql('Log in to your account')
            .expect(loginModel.emailLabel.innerText).contains('Email address')
            .expect(loginModel.passwordLabel.innerText).contains('Password')
            .expect(loginModel.loginButton.innerText).eql('Login')
            .expect(loginModel.forgotPasswordButton.innerText).eql('Forgot password?')
            .expect(loginModel.registerButton.innerText).eql('Register now');
    });

test
    .meta('testID', 't-0005')
    ('Check if login without any input shows any error', async t => {
        await loginModel.clearEmail();
        await loginModel.clearPassword();
        await t
            .click(loginModel.loginButton)
            .expect(loginModel.loginError.innerText).eql('Login failed');
    });

test
    .meta('testID', 't-0006')
    ('Check if forgot password button redirects to intended page', async t => {
        await t
            .click(loginModel.forgotPasswordButton)
            .expect(getPageUrl()).eql('https://member.dev.clubswan.com/password-reset');
    });

test
    .meta('testID', 't-0007')
    ('Check if register now button redirects to intended page', async t => {
        await t
            .click(loginModel.registerButton)
            .expect(getPageUrl()).eql('https://member.dev.clubswan.com/signup');
    });

test
    .meta('testID', 't-0008')
    ('Check if valid user can successfully login', async t => {
        await t
            .useRole(validUser);
    });

test
    .meta('testID', 't-0009')
    ('Check if invalid user cannot login', async t => {
        await t
            .useRole(invalidUser);
    });
    
test
    .meta('testID', 't-0010')
    ('Check if the localize widget is present in the page', async t => {
        await t
            .expect(loginModel.localizeWidget.exists).ok();
    });

test
    .meta('testID', 't-0011')
    ('Check if the default selected language is English', async t => {
        await t
            .expect(loginModel.localizeWidget.innerText).eql('English');
    });

test
    .meta('testID', 't-0012')
    ('Check localize widget functions', async t => {
        await t 
            .maximizeWindow()
            .hover(loginModel.localizeWidget, {
                offsetX: 20,
                offsetY: 20,
                speed: 0.5
            })
            .expect(loginModel.poweredByText.visible).ok('Language widget did not expand');
    });


fixture `Club Swan password reset page`
    .meta('fixtureID', 'f-0002')
    .meta({author: 'Fatin', creationDate: '22/06/2020'})
    .page `https://member.dev.clubswan.com/password-reset`
    .beforeEach( async t => {
        await t
            .maximizeWindow();
    });

test
    .meta('testID', 't-0013')
    ('Check if the page URL is valid', async t => {
        await t
            .expect(getPageUrl()).eql('https://member.dev.clubswan.com/password-reset');
    });

test
    .meta('testID', 't-0014')
    ('Check if all input fields and buttons are present', async t => {
        await t
            .expect(resetModel.emailField.exists).ok()
            .expect(resetModel.sendEmailButton.exists).ok()
            .expect(resetModel.cancelButton.exists).ok();
    });

test
    .meta('testID', 't-0015')
    ('Check if all the labels are correct', async t => {
        await t 
            .expect(resetModel.headerLabel.innerText).eql('Password Reset')
            .expect(resetModel.emailLabel.innerText).eql('Email address')
            .expect(resetModel.sendEmailButton.innerText).eql('Send email')
            .expect(resetModel.cancelButton.innerText).eql('Cancel');
    });

test 
    .meta('testID', 't-0016')
    ('Check if the send mail button is disabled by default', async t => {
        await t
            .expect(resetModel.sendEmailButton.hasAttribute('disabled')).ok();
    });

test
    .meta('testID', 't-0017')
    ('Check if something is typed on the email field then the send button is enabled', async t => {
        await t
            .typeText(resetModel.emailField, validEmail)
            .expect(resetModel.sendEmailButton.hasAttribute('disabled')).notOk()
            .wait(5000);
    });