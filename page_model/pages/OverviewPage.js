import { Selector } from 'testcafe'

class OverviewPage {
    constructor(){
        this.pageTitle = Selector('.subheader')
        this.cancelButton = Selector('.cart_cancel_link.btn_secondary')
        this.finishButton = Selector('.btn_action.cart_button')   
        this.summaryInfoSection = Selector('.summary_info')
        this.itemName = Selector('.inventory_item_name') 
        
    }
}

export default new OverviewPage()