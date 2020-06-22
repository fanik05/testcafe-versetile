import { Selector } from 'testcafe';

class Login {
    constructor() {
        this.title = Selector('title');
        console.log("hi" + this.title);
    }
}

module.exports = new Login();