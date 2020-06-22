import { Selector } from 'testcafe';
import { ClientFunction } from 'testcafe';

fixture `Club Swan Login Page`
    .meta('fixtureID', 'f-0001')
    .meta({author: 'Fatin', creationDate: '19/06/2020'})
    .page `https://member.dev.clubswan.com/`;

const title = Selector('title');

test
    .meta('testID', 't-0001')
    ('Check if the page title is correct', async t => {
        await t
            .expect(title.innerText).eql('Club Swan');
    });

const getPageUrl = ClientFunction(() => window.location.href);

test
    .meta('testID', 't-0002')
    ('Check if the page URL is valid', async t => {
        await t
            .expect(getPageUrl()).eql('https://member.dev.clubswan.com/');
    });

const emailInput = Selector('input[type="email"]');
const passwordInput = Selector('input[type="password"]');
const buttons = Selector('button');

test
    .meta('testID', 't-0003')
    ('Check if all input fields and buttons are present', async t => {
        await t
            .expect(emailInput.exists).ok()
            .expect(passwordInput.exists).ok()
            .expect(buttons.count).eql(3);
    });

const headerLabel = Selector('.description')    
const emailLabel = Selector('.Input ').child('label').nth(0);
const passwordLabel = Selector('.Input ').child('label').nth(1);
const loginButton = Selector('.buttons').child('button').nth(0);
const forgotPasswordButton = Selector('.buttons').child('button').nth(1);
const registerButton = Selector('button').withText('Register now');

test
    .meta('testID', 't-0004')
    ('Check if all the labels are correct', async t => {
        await t
            .expect(headerLabel.innerText).eql('Log in to your account')
            .expect(emailLabel.innerText).contains('Email address')
            .expect(passwordLabel.innerText).contains('Password')
            .expect(loginButton.innerText).eql('Login')
            .expect(forgotPasswordButton.innerText).eql('Forgot password?')
            .expect(registerButton.innerText).eql('Register now');
    });

const localizeWidget = Selector('#localize-widget');

test
    .meta('testID', 't-0005')
    ('Check if the localize widget is present in the page', async t => {
        await t
            .expect(localizeWidget.exists).ok();
    });

test
    .meta('testID', 't-0006')
    ('Check if the default selected language is English', async t => {
        await t
            .expect(localizeWidget.innerText).eql('English');
    })

test
    .meta('testID', 't-0007')
    ('Check localize widget functions', async t => {
        await t 
            .maximizeWindow()
            .hover(localizeWidget, {
                offsetX: 20,
                offsetY: 20,
                speed: 0.5
            })
            .takeScreenshot({
                path: 'screenshots/loginPage.png',
                fullPage: true
            })
            .wait(20000);
    });