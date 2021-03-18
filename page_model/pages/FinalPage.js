import { Selector } from 'testcafe'

class FinalPage {
    constructor(){
        this.pageTitle = Selector('.subheader')
        this.thanksMessage = Selector('.complete-header')  
    }
}

export default new FinalPage()