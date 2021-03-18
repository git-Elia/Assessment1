import { Selector } from 'testcafe'

class ShoppingCartPage {
    constructor(){
        this.pageTitle = Selector('.subheader')
        this.continueShoppingButton = Selector('.btn_secondary')
        this.checkoutButton = Selector('.checkout_button')  
        this.itemName = Selector('.inventory_item_name')    
    }
}

export default new ShoppingCartPage()