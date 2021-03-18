import { Selector, t } from 'testcafe'

class LoginPage {
    constructor(){
        this.usernameField = Selector('input[name="user-name"]')
        this.passwordField = Selector('#password')
        this.loginButton = Selector('.btn_action') 
        this.errorMessage = Selector('h3[data-test="error"]')

    }

    async submitLoginForm(username, password){
        await t.typeText(this.usernameField, username)
        await t.typeText(this.passwordField, password)
        await t.click(this.loginButton)
    }
}

export default new LoginPage()