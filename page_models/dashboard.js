import { Selector } from 'testcafe';

class Dashboard {
    constructor() {
        this.welcomeBanner = Selector('h6').withText('Welcome to Club Swan ...');
    }
}

export default new Dashboard();