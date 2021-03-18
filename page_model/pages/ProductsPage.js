import { Selector } from 'testcafe'

class ProductsPage {
    constructor(){
        this.pageTitle = Selector('.product_label')
        //this.menuBurgerButtonn = Selector('.bm-burger-button')
        this.productItem = Selector('.inventory_container')
        this.addToCartButton = Selector('.btn_primary.btn_inventory')
        //this.logoutButton = Selector('#logout_sidebar_link') 
        this.shoppingCartButton = Selector('.svg-inline--fa.fa-shopping-cart') 
        this.shoppingCartIcon = Selector('.fa-layers-counter.shopping_cart_badge') 
        this.itemName = Selector('.inventory_item_name') 
       
    }
}

export default new ProductsPage()