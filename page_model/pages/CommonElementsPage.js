import { Selector, t } from 'testcafe'

class CommonElementsPage {
    constructor(){
        this.menuBurgerButtonn = Selector('.bm-burger-button')
        this.logoutButton = Selector('#logout_sidebar_link')        
    }

    async submitLogout(){
        await t.click(this.menuBurgerButtonn)
        await t.click(this.logoutButton)
    }
}

export default new CommonElementsPage()