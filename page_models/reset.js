import { Selector } from 'testcafe';

class Reset {
    constructor() {
        this.headerLabel = Selector('.description');
        this.emailLabel = Selector('.Input ').child('label');
        this.emailField = Selector('input[type="email"]');
        this.sendEmailButton = Selector('button').withText('Send email');
        this.cancelButton = Selector('button').withText('Cancel');
    } 
}

export default new Reset();