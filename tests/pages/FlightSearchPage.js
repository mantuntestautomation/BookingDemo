const { expect } = require('@playwright/test');

class FlightSearchPage {
    constructor(page) {
        this.page = page;
        this.fromSelect = page.locator("//select[@name='fromPort']");
        this.toSelect = page.locator("//select[@name='toPort']");
        this.findFlightsBtn = page.getByRole('button', { name: 'Find Flights' });
        this.resultSource = page.locator("//th[contains(., 'Departs:')]");
        this.resultDestination = page.locator("//th[contains(., 'Departs:')]/following-sibling::th[1]");
        this.selectedFrom = null;
        this.selectedTo = null;
        this.flightResultsHeader = page.locator("//div[@class='container'] //h3");
    }

     async goTo()
    {
        await this.page.goto(process.env.BASE_URL);
    }

    getRandomIndex(count) {
        return Math.floor(Math.random() * count);
    }

    async selectFrom() {
        const options = await this.fromSelect.locator('option').all();
        const count = options.length;
        if (count === 0) {
            throw new Error('No options available in the source dropdown');
        }
        const randomIndex = this.getRandomIndex(count);
        this.selectedFrom = await options[randomIndex].textContent();
        await this.fromSelect.selectOption({ label: this.selectedFrom });
    }

    async selectTo() {
        const options = await this.toSelect.locator('option').all();
        const count = options.length;
        if (count === 0) {
            throw new Error('No options available in the destination dropdown');
        }
        const randomIndex = this.getRandomIndex(count);
        this.selectedTo = await options[randomIndex].textContent();
        await this.toSelect.selectOption({ label: this.selectedTo });
    }

    getSelectedFrom() {
        return this.selectedFrom;
    }

    getSelectedTo() {
        return this.selectedTo;
    }

    async clickFindFlights() {
        await this.findFlightsBtn.click();
    }

    async validateFlightSourceDestination() {
        const headerText = await this.flightResultsHeader.textContent();
        console.log('Header Text:', headerText);
        const expectedText = `Flights from ${this.selectedFrom} to ${this.selectedTo}:`;
        console.log('Expected Header Text:', expectedText);
        await expect(headerText.trim()).toBe(expectedText);
    }

    async validateDepartureArrivalHeaders() {
        const source = await this.resultSource.first().textContent();
        const destination = await this.resultDestination.first().textContent();
        return {
            source: source ? source.trim().replace('Departs: ', '') : '',
            destination: destination ? destination.trim().replace('Arrives: ', '') : ''
        };
    }
}

module.exports = { FlightSearchPage };
