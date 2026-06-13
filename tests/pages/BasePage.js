const { test, expect } = require('@playwright/test');

/**
 * BasePage class providing common functionality for all page objects.
 */
class BasePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
    }

    /**
     * Navigates to a specific URL
     * @param {string} url 
     */
    async navigate(url = '/') {
        await test.step(`Navigate to ${url}`, async () => {
            await this.page.goto(url);
        });
    }

    /**
     * Validates page title
     * @param {string} expectedTitle 
     */
    async validateTitle(expectedTitle) {
        await test.step(`Validate page title is "${expectedTitle}"`, async () => {
            await expect(this.page).toHaveTitle(expectedTitle);
        });
    }

    /**
     * Validates current URL matches regex
     * @param {RegExp} urlRegex 
     */
    async validateURL(urlRegex) {
        await test.step(`Validate current URL matches ${urlRegex}`, async () => {
            await expect(this.page).toHaveURL(urlRegex);
        });
    }

    /**
     * Shared utility for random indexing
     * @param {number} count 
     */
    getRandomIndex(count) {
        return Math.floor(Math.random() * count);
    }
}

module.exports = { BasePage };
