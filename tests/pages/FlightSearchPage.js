const { expect } = require('@playwright/test');

class FlightSearchPage {
    constructor(page) {
        this.page = page;
        this.fromSelect = page.locator("//select[@name='fromPort']");
        this.toSelect = page.locator("//select[@name='toPort']");
        this.findFlightsBtn = page.getByRole('button', { name: 'Find Flights' });
        this.resultHeader = page.locator("//th[contains(., 'Departs:')]");
        this.resultDestination = page.locator("//th[contains(., 'Departs:')]/following-sibling::th[1]");
    }

     async goTo()
    {
        await this.page.goto(process.env.BASE_URL);
    }

    async selectFrom(optionValue) {
        await this.fromSelect.selectOption({ label: optionValue });
    }

    async selectTo(optionValue) {
        await this.toSelect.selectOption({ label: optionValue });
    }

    async clickFindFlights() {
        await this.findFlightsBtn.click();
    }

    async getFlightSourceDestination() {
        const source = await this.resultHeader.first().textContent();
        const destination = await this.resultDestination.first().textContent();
        return {
            source: source ? source.trim().replace('Departs: ', '') : '',
            destination: destination ? destination.trim().replace('Arrives: ', '') : ''
        };
    }
}

module.exports = { FlightSearchPage };
