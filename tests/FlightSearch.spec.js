const { test, expect } = require('@playwright/test');
const { FlightSearchPage } = require('./pages/FlightSearchPage');
const searchFlight = JSON.parse(JSON.stringify(require('./utils/data/searchFlight.json')));

for(const data of searchFlight)
{
test('@Regression Search flights and validate source & destination', async ({ page }) => {
    const flightPage = new FlightSearchPage(page);
    
    // Navigate to Travel Agency app and validate title
    await flightPage.goTo();
    await expect(page).toHaveTitle('BlazeDemo');

    // Select source and destination and validate results
    await flightPage.selectFrom(data.from);
    await flightPage.selectTo(data.to);
    await flightPage.clickFindFlights();

    const header = await flightPage.getFlightSourceDestination();
    await expect(header.source).toBe(data.from);
    await expect(header.destination).toBe(data.to);
    
}
)};
