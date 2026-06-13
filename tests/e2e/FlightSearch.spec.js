const { test, expect } = require('../fixtures/baseFixtures');
const { APP_CONSTANTS } = require('../constants/appConstants');

test.describe('Flight Search and Booking Regression Suite', () => {

    /**
     * Reusable logic to search for a flight with random cities
     * This fulfills the DRY principle requirement.
     */
    async function searchForRandomFlight(flightSearchPage) {
        await test.step('Navigate to Application', async () => {
            await flightSearchPage.goTo();
            await flightSearchPage.validateTitle(APP_CONSTANTS.TITLES.MAIN_PAGE);
        });

        await test.step('Select Random Departure and Destination Cities', async () => {
            // No hardcoding: count items and select randomly in the POM
            await flightSearchPage.selectRandomFrom();
            await flightSearchPage.selectRandomTo();
        });

        await test.step('Click Find Flights', async () => {
            await flightSearchPage.clickFindFlights();
        });
    }

    test('@Regression TC01_Search flights and validate header', async ({ flightSearchPage }) => {
        await searchForRandomFlight(flightSearchPage);

        await test.step('Validate Search Results Header', async () => {
            const selectedFrom = flightSearchPage.selectedFrom;
            const selectedTo = flightSearchPage.selectedTo;
            const headerText = await flightSearchPage.flightResultsHeader.textContent();
            const expectedText = `Flights from ${selectedFrom} to ${selectedTo}:`;
            expect(headerText.trim()).toBe(expectedText);
        });
    });

    test('@Regression TC02_Search flights and validate column headers', async ({ flightSearchPage }) => {  
        await searchForRandomFlight(flightSearchPage);

        await test.step('Validate Departure and Arrival Column Headers', async () => {
            const selectedFrom = flightSearchPage.selectedFrom;
            const selectedTo = flightSearchPage.selectedTo;
            const header = await flightSearchPage.getHeaderValues();

            expect(header.source).toBe(selectedFrom);
            expect(header.destination).toBe(selectedTo);
        });
    });

    test('@Regression TC03_Book a random flight and validate confirmation', async ({ flightSearchPage }) => {
        await searchForRandomFlight(flightSearchPage);

        await test.step('Select a Random Flight from results', async () => {
            // Count number of results and select randomly
            await flightSearchPage.selectRandomFlight();
            await flightSearchPage.validateURL(new RegExp(APP_CONSTANTS.ENDPOINTS.PURCHASE));
        });

        await test.step('Fill Passenger Details and Purchase', async () => {
            await expect(flightSearchPage.purchaseFlightBtn).toBeVisible();
            await flightSearchPage.fillPassengerDetails();
            await flightSearchPage.clickPurchase();
        });

        await test.step('Validate Confirmation Message', async () => {
            const confirmationMessage = await flightSearchPage.getConfirmationText();
            expect(confirmationMessage).toBe(APP_CONSTANTS.MESSAGES.PURCHASE_SUCCESS);
        });
    });

});
