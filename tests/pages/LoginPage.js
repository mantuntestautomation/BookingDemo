const {test, expect, locator, page} = require('@playwright/test');
const { validateElementVisible } = require('../utils/elementValidator');

class LoginPage{

    constructor(page)
    {
        this.page = page;
        this.username = page.getByRole('textbox', { name: 'Username:' });
        this.password = page.getByRole('textbox', { name: 'Password:' });
        this.checkbox = page.getByRole('checkbox', { name: 'I Agree to the terms and' });
        this.signin = page.getByRole('button', { name: 'Sign In' });
        this.protohome = page.getByRole('link', { name: 'ProtoCommerce Home' });
        this.shop = page.getByRole('link', { name: 'Shop' });
    }

    async goTo()
    {
        await this.page.goto(process.env.BASE_URL);
    }

    async validLogin(username,password)
    {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.checkbox.check();
        await this.signin.click();
    }

    async navigateToShop()
    {
        await validateElementVisible(this.protohome, "ProtoCommerce Home Link");
        await this.shop.click();
    }


}

module.exports = {LoginPage};