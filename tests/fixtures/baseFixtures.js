const base = require('@playwright/test');
const { FlightSearchPage } = require('../pages/FlightSearchPage');

/**
 * Custom fixtures to extend the base Playwright test.
 * This allows us to inject page objects directly into our tests.
 */
exports.test = base.test.extend({
    flightSearchPage: async ({ page }, use) => {
        const flightSearchPage = new FlightSearchPage(page);
        await use(flightSearchPage);
    },
    // Add other page objects here as they are created
});

exports.expect = base.expect;
