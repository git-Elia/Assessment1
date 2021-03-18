import LoginPage from '../pages/LoginPage'
import ProductsPage from '../pages/ProductsPage'
import ShoppingCartPage from '../pages/ShoppingCartPage'
import YourInformationPage from '../pages/YourInformationPage'
import OverviewPage from '../pages/OverviewPage'
import FinalPage from '../pages/FinalPage'
import CommonElementsPage from '../pages/CommonElementsPage'
import {CREDENTIALS, USERINFO} from '../data/Constants'

 fixture('Login feature testing')
    .page `https://www.saucedemo.com/`

test('TC01 - Login with a valid user', async t => {
    //Login with a valid user
    await LoginPage.submitLoginForm(CREDENTIALS.VALID_USER.USERNAME, CREDENTIALS.VALID_USER.PASSWORD)
   
    // Assertions 
    await t.expect(ProductsPage.pageTitle.exists).ok()
    await t.expect((ProductsPage.pageTitle).innerText).eql('Products')
    await t.expect(CommonElementsPage.menuBurgerButtonn.exists).ok()
    
    
    //Postconditions
    await CommonElementsPage.submitLogout()
})

test('TC02 - Login with an invalid user', async t => {
    //Login with an invalid user
    await LoginPage.submitLoginForm(CREDENTIALS.INVALID_USER.USERNAME, CREDENTIALS.INVALID_USER.PASSWORD)
    
    // Assertions 
    await t.expect(LoginPage.errorMessage.exists).ok()
    await t.expect(LoginPage.errorMessage.innerText).contains('Username and password do not match any user in this service')
})

test('TC03 - Logout from product\'s page', async t => {
    //Preconditions
    await LoginPage.submitLoginForm(CREDENTIALS.VALID_USER.USERNAME, CREDENTIALS.VALID_USER.PASSWORD)
    
    //Logout from product's page
    await CommonElementsPage.submitLogout()

    // Assertions 
    await t.expect(LoginPage.usernameField.exists).ok()
    await t.expect(LoginPage.passwordField.exists).ok()
    await t.expect(LoginPage.loginButton.exists).ok()
})

test('TC04 - Navigate to the shopping chart', async t => {
    //Preconditions
    await LoginPage.submitLoginForm(CREDENTIALS.VALID_USER.USERNAME, CREDENTIALS.VALID_USER.PASSWORD)
    
    //Navigate to the shopping chart
    await t.click(ProductsPage.shoppingCartButton)

    // Assertions 
    await t.expect(ShoppingCartPage.pageTitle.exists).ok()
    await t.expect((ShoppingCartPage.pageTitle).innerText).eql('Your Cart')
    await t.expect(ShoppingCartPage.continueShoppingButton.exists).ok()
    await t.expect(ShoppingCartPage.checkoutButton.exists).ok()

    //Postconditions
    await CommonElementsPage.submitLogout()
})

test('TC05 - Add a single item to the shopping cart', async t => {
    //Preconditions
    await LoginPage.submitLoginForm(CREDENTIALS.VALID_USER.USERNAME, CREDENTIALS.VALID_USER.PASSWORD)
    
    //Add a single item to the shopping cart
    await t.click (ProductsPage.addToCartButton.nth(0))
    await t.click(ProductsPage.shoppingCartButton)

    //Assertions 
    await t.expect(ProductsPage.shoppingCartIcon.exists).ok()
    await t.expect(ProductsPage.shoppingCartIcon.innerText).eql('1')
    await t.expect(ProductsPage.itemName.innerText).eql('Sauce Labs Backpack')
    await t.expect(ShoppingCartPage.pageTitle.exists).ok()
    await t.expect((ShoppingCartPage.pageTitle).innerText).eql('Your Cart')
    await t.expect(ShoppingCartPage.continueShoppingButton.exists).ok()
    await t.expect(ShoppingCartPage.checkoutButton.exists).ok()

    //Postconditions
    await CommonElementsPage.submitLogout()
})

test('TC06 - Add multiple items to the shopping cart', async t => {
    //Preconditions
    await LoginPage.submitLoginForm(CREDENTIALS.VALID_USER.USERNAME, CREDENTIALS.VALID_USER.PASSWORD)
    
    //Add multiple items to the shopping cart
    await t.click (ProductsPage.addToCartButton.nth(0))
    await t.click (ProductsPage.addToCartButton.nth(0))
    await t.click (ProductsPage.addToCartButton.nth(0))
    await t.click(ProductsPage.shoppingCartButton)

    // Assertions
    await t.expect(ProductsPage.shoppingCartIcon.exists).ok()
    await t.expect(ProductsPage.shoppingCartIcon.innerText).eql('3')
    await t.expect((ProductsPage.itemName.nth(0)).innerText).eql('Sauce Labs Backpack')
    await t.expect((ProductsPage.itemName.nth(1)).innerText).eql('Sauce Labs Bike Light')
    await t.expect((ProductsPage.itemName.nth(2)).innerText).eql('Sauce Labs Bolt T-Shirt')
    await t.expect(ShoppingCartPage.pageTitle.exists).ok()
    await t.expect((ShoppingCartPage.pageTitle).innerText).eql('Your Cart')
    await t.expect(ShoppingCartPage.continueShoppingButton.exists).ok()
    await t.expect(ShoppingCartPage.checkoutButton.exists).ok()

    //Postconditions
    await CommonElementsPage.submitLogout()
})

test('TC07 - Continue with missing mail information', async t => {
    //Preconditions
        //Login
        await LoginPage.submitLoginForm(CREDENTIALS.VALID_USER.USERNAME, CREDENTIALS.VALID_USER.PASSWORD)
        //Add items to the shopping cart
        await t.click (ProductsPage.addToCartButton.nth(0))
        await t.click (ProductsPage.addToCartButton.nth(0))
        await t.click(ProductsPage.shoppingCartButton)
        //Go to the Your Information page         
        await t.expect(ShoppingCartPage.checkoutButton.exists).ok()
        await t.click(ShoppingCartPage.checkoutButton)

    //Continue with missing mail information
    await t.typeText(YourInformationPage.firstNameField, USERINFO.USER_INFO_VALID.NAME)
    await t.typeText(YourInformationPage.lastNameField, USERINFO.USER_INFO_VALID.LAST_NAME)

    await t.click(YourInformationPage.continueButton)

    // Assertions
    await t.expect((YourInformationPage.pageTitle).innerText).eql('Checkout: Your Information')
    await t.expect(YourInformationPage.errorMessage.exists).ok()
    await t.expect(YourInformationPage.errorMessage.innerText).contains('Postal Code is required')

    //Postconditions
    await CommonElementsPage.submitLogout()

})

test('TC08 - Fill User\'s information', async t => {
    //Preconditions
        //Login
        await LoginPage.submitLoginForm(CREDENTIALS.VALID_USER.USERNAME, CREDENTIALS.VALID_USER.PASSWORD)
        //Add items to the shopping cart
        await t.click (ProductsPage.addToCartButton.nth(0))
        await t.click (ProductsPage.addToCartButton.nth(0))
        await t.click(ProductsPage.shoppingCartButton)
        //Go to the Your Information page  
        await t.expect(ShoppingCartPage.checkoutButton.exists).ok()
        await t.click(ShoppingCartPage.checkoutButton)

    //Fill User's information
    await t.expect(YourInformationPage.pageTitle.exists).ok()
    await t.expect((YourInformationPage.pageTitle).innerText).eql('Checkout: Your Information')
    await t.typeText(YourInformationPage.firstNameField, USERINFO.USER_INFO_VALID.NAME)
    await t.typeText(YourInformationPage.lastNameField, USERINFO.USER_INFO_VALID.LAST_NAME)
    await t.typeText(YourInformationPage.zipCodeField, USERINFO.USER_INFO_VALID.ZIP_CODE)
    
    await t.click(YourInformationPage.continueButton)

    // Assertions (Go to OverviewPage)
    await t.expect(OverviewPage.pageTitle.exists).ok()
    await t.expect((OverviewPage.pageTitle).innerText).eql('Checkout: Overview')
    await t.expect(OverviewPage.cancelButton.exists).ok()
    await t.expect(OverviewPage.finishButton.exists).ok()
    await t.expect(OverviewPage.summaryInfoSection.exists).ok()
    
    //Postconditions
    await CommonElementsPage.submitLogout()

})

test('TC09 - Final order items', async t => {
    //Preconditions
        //Login
        await LoginPage.submitLoginForm(CREDENTIALS.VALID_USER.USERNAME, CREDENTIALS.VALID_USER.PASSWORD)
        //Add items to the shopping cart
        await t.click (ProductsPage.addToCartButton.nth(0))
        await t.click (ProductsPage.addToCartButton.nth(0))
        await t.click(ProductsPage.shoppingCartButton)
        //Go to the Your Information page 
        await t.expect(ShoppingCartPage.checkoutButton.exists).ok()
        await t.click(ShoppingCartPage.checkoutButton)
        //Fill User's information
        await t.typeText(YourInformationPage.firstNameField, USERINFO.USER_INFO_VALID.NAME)
        await t.typeText(YourInformationPage.lastNameField, USERINFO.USER_INFO_VALID.LAST_NAME)
        await t.typeText(YourInformationPage.zipCodeField, USERINFO.USER_INFO_VALID.ZIP_CODE)
        //Go to OverviewPage
        await t.click(YourInformationPage.continueButton)

    //Final order items (Validate items in the OverviewPage)
    //Assertions
    await t.expect(OverviewPage.pageTitle.exists).ok()
    await t.expect((OverviewPage.pageTitle).innerText).eql('Checkout: Overview')
    await t.expect(OverviewPage.finishButton.exists).ok()
    await t.expect(OverviewPage.summaryInfoSection.exists).ok()
    await t.expect((OverviewPage.itemName.nth(0)).innerText).eql('Sauce Labs Backpack')
    await t.expect((OverviewPage.itemName.nth(1)).innerText).eql('Sauce Labs Bike Light')
    
    //Postconditions
    await CommonElementsPage.submitLogout()

})

test('TC10 - Complete a purchase', async t => {
    //Preconditions
        //Login
        await LoginPage.submitLoginForm(CREDENTIALS.VALID_USER.USERNAME, CREDENTIALS.VALID_USER.PASSWORD)
        //Add items to the shopping cart
        await t.click (ProductsPage.addToCartButton.nth(0))
        await t.click (ProductsPage.addToCartButton.nth(0))
        await t.click(ProductsPage.shoppingCartButton)
        //Go to the Your Information page
        await t.expect(ShoppingCartPage.checkoutButton.exists).ok()
        await t.click(ShoppingCartPage.checkoutButton)
        //Fill User's information
        await t.typeText(YourInformationPage.firstNameField, USERINFO.USER_INFO_VALID.NAME)
        await t.typeText(YourInformationPage.lastNameField, USERINFO.USER_INFO_VALID.LAST_NAME)
        await t.typeText(YourInformationPage.zipCodeField, USERINFO.USER_INFO_VALID.ZIP_CODE)
        //Go to OverviewPage
        await t.click(YourInformationPage.continueButton)
        //Validate items in the OverviewPage
        await t.expect((OverviewPage.itemName.nth(0)).innerText).eql('Sauce Labs Backpack')
        await t.expect((OverviewPage.itemName.nth(1)).innerText).eql('Sauce Labs Bike Light')
    
    //Complete a purchase
    await t.click(OverviewPage.finishButton)

    //Assertions
    await t.expect(FinalPage.pageTitle.exists).ok()
    await t.expect((FinalPage.pageTitle).innerText).eql('Finish')
    await t.expect(FinalPage.thanksMessage.exists).ok()
    await t.expect(FinalPage.thanksMessage.innerText).eql('THANK YOU FOR YOUR ORDER')

    //Postconditions
    await CommonElementsPage.submitLogout()
})