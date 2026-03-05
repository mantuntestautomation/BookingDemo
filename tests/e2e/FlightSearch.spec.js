const { test, expect } = require('@playwright/test');
const { FlightSearchPage } = require('../pages/FlightSearchPage');

test('@Regression TC01_Search flights and validate source & destination', async ({ page }) => {
    const flightPage = new FlightSearchPage(page);
    
    // Navigate to BlazeDemo app and validate title
    await flightPage.goTo();
    await expect(page).toHaveTitle('BlazeDemo');

    // Select source and destination
    await flightPage.selectFrom();
    await flightPage.selectTo();
    await flightPage.clickFindFlights();

    // Valiate the “Flights from <source> to <destination>” on flight search results page 
    const selectedFrom = flightPage.getSelectedFrom();
    const selectedTo = flightPage.getSelectedTo();
    await flightPage.validateFlightSourceDestination();
    
});

test('@Regression TC02_Search flights and validate departure and arrival headers', async ({ page }) => {
    const flightPage = new FlightSearchPage(page);
    
    // Navigate to BlazeDemo app and validate title
    await flightPage.goTo();
    await expect(page).toHaveTitle('BlazeDemo');

    // Select source and destination
    await flightPage.selectFrom();
    await flightPage.selectTo();
    await flightPage.clickFindFlights();

    // Validate the departure and arrival headers on the flight search results page
    const selectedFrom = flightPage.getSelectedFrom();
    const selectedTo = flightPage.getSelectedTo();
    const header = await flightPage.validateDepartureArrivalHeaders();
    await expect(header.source).toBe(selectedFrom);
    await expect(header.destination).toBe(selectedTo);
    
});

test('@Regression TC03_Book a flight and validate confirmation', async ({ page }) => {
    const flightPage = new FlightSearchPage(page);
    
    // Navigate to BlazeDemo app and validate title
    await flightPage.goTo();
    await expect(page).toHaveTitle('BlazeDemo');

    // Select source and destination
    await flightPage.selectFrom();
    await flightPage.selectTo();
    await flightPage.clickFindFlights();

    // Select a flight from the search results
    await flightPage.selectChooseThisFlight();

    // after choosing a flight we should land on the purchase page
    await expect(page).toHaveURL(/.*purchase\.php/);
    // confirm purchase form is visible
    await expect(flightPage.purchaseFlightBtn).toBeVisible();

    // Fill passenger details on the purchase page
    await flightPage.fillPassengerDetails();

    // Click on the “Purchase Flight” button
    await flightPage.clickPurchaseFlight();

    // Validate the confirmation message on the confirmation page
    const confirmationMessage = await flightPage.getConfirmationMessage();
    await expect(confirmationMessage).toBe('Thank you for your purchase today!');


});
