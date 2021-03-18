import { Selector } from 'testcafe'

class YourInformationPage {
    constructor(){
        this.pageTitle = Selector('.subheader')//.withExactText('Checkout: Your Information')
        this.cancelButton = Selector('.cart_cancel_link.btn_secondary')
        this.continueButton = Selector('.btn_primary.cart_button')   
        this.firstNameField = Selector('#first-name')
        this.lastNameField = Selector('#last-name')
        this.zipCodeField = Selector('#postal-code')
        this.errorMessage = Selector('h3[data-test="error"]')
    }
}

export default new YourInformationPage()