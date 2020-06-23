import { Selector, t } from 'testcafe';

class Onboarding {
    constructor () {
        this.errorText = Selector('.notification-main-container').find('span').nth(0);
        this.doThisLaterButton = Selector('button').withText('Do This Later');
        this.makePaymentButton = Selector('button').withText('Make Payment');
    }

    async doThisLater () {
        await t
            .click(this.doThisLaterButton);
    }

    async makePayment () {
        await t
            .click(this.makePaymentButton);
    }
}

export default new Onboarding();