const { test, expect } =  require('@playwright/test');
const {CryptoJS} = require("crypto-js");
const {only} = require('node:test');
const {LoginPage} = require('./pages/LoginPage');
const dataset = JSON.parse(JSON.stringify(require('./utils/data/loginTestData.json')));

for(const data of dataset)
{
    test.beforeEach(`Login app with ${data.username}`, async ({page}) =>
    
        {
            const loginPage = new LoginPage(page);
            await loginPage.goTo();

            await loginPage.validLogin(data.username,data.password);

            //validate page title
            await expect(page).toHaveTitle('ProtoCommerce');
        }
    
    );

    test('@Regression validate login page', async ({page})=>
    {
        const loginPage = new LoginPage(page);
        await loginPage.navigateToShop();
    });
}

