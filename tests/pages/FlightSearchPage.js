const { test } = require('@playwright/test');
const { faker } = require('@faker-js/faker');
const { BasePage } = require('./BasePage');

class FlightSearchPage extends BasePage {
    constructor(page) {
        super(page);
        this.fromSelect = page.locator("//select[@name='fromPort']");
        this.toSelect = page.locator("//select[@name='toPort']");
        this.findFlightsBtn = page.getByRole('button', { name: 'Find Flights' });
        this.resultSource = page.locator("//th[contains(., 'Departs:')]");
        this.resultDestination = page.locator("//th[contains(., 'Departs:')]/following-sibling::th[1]");
        this.selectedFrom = null;
        this.selectedTo = null;
        this.flightResultsHeader = page.locator("//div[@class='container']//h3");
        this.chooseThisFlightBtn = page.getByRole('button', { name: 'Choose This Flight' });
        this.nameInput = page.locator("#inputName");
        this.addressInput = page.locator("#address");
        this.cityInput = page.locator("#city");
        this.stateInput = page.locator("#state");
        this.zipCodeInput = page.locator("#zipCode");
        this.cardTypeSelect = page.locator("#cardType");
        this.creditCardNumberInput = page.locator("#creditCardNumber");
        this.creditCardMonthInput = page.locator("#creditCardMonth");
        this.creditCardYearInput = page.locator("#creditCardYear");
        this.nameOnCardInput = page.locator("#nameOnCard");
        this.purchaseFlightBtn = page.getByRole('button', { name: 'Purchase Flight' });
        this.confirmationMessage = page.locator("//div[@class='container']//h1");
    }

    async goTo() {
        await this.navigate(process.env.BASE_URL);
    }

    /**
     * Randomly selects a city from the source dropdown
     * No hardcoding - counts items and selects randomly
     */
    async selectRandomFrom() {
        const options = await this.fromSelect.locator('option').all();
        const randomIndex = this.getRandomIndex(options.length);
        this.selectedFrom = await options[randomIndex].textContent();
        await this.fromSelect.selectOption({ index: randomIndex });
        return this.selectedFrom;
    }

    /**
     * Randomly selects a city from the destination dropdown
     * No hardcoding - counts items and selects randomly
     */
    async selectRandomTo() {
        const options = await this.toSelect.locator('option').all();
        const randomIndex = this.getRandomIndex(options.length);
        this.selectedTo = await options[randomIndex].textContent();
        await this.toSelect.selectOption({ index: randomIndex });
        return this.selectedTo;
    }

    async clickFindFlights() {
        await this.findFlightsBtn.click();
    }

    async getHeaderValues() {
        const source = await this.resultSource.first().textContent();
        const destination = await this.resultDestination.first().textContent();
        return {
            source: source ? source.trim().replace('Departs: ', '') : '',
            destination: destination ? destination.trim().replace('Arrives: ', '') : ''
        };
    }

    /**
     * Counts number of flights and randomly selects one
     */
    async selectRandomFlight() {
        const buttons = await this.chooseThisFlightBtn.all();
        const count = buttons.length;
        if (count === 0) {
            throw new Error('No flights available to choose');
        }
        const randomIndex = this.getRandomIndex(count);
        await buttons[randomIndex].click();
    }

    async fillPassengerDetails() {
        const cardTypes = ['visa', 'American Express'];
        const randomCardType = cardTypes[this.getRandomIndex(cardTypes.length)];
        
        const details = {
            name: faker.person.fullName(),
            address: faker.location.streetAddress(),
            city: faker.location.city(),
            state: faker.location.state({ abbreviated: true }),
            zipCode: faker.location.zipCode(),
            cardType: randomCardType,
            creditCardNumber: faker.finance.creditCardNumber(randomCardType),
            creditCardMonth: String(this.getRandomIndex(12) + 1).padStart(2, '0'),
            creditCardYear: String(new Date().getFullYear() + this.getRandomIndex(10) + 1),
            nameOnCard: faker.person.fullName()
        };
        
        await this.nameInput.fill(details.name);
        await this.addressInput.fill(details.address);
        await this.cityInput.fill(details.city);
        await this.stateInput.fill(details.state);
        await this.zipCodeInput.fill(details.zipCode);
        await this.cardTypeSelect.selectOption(details.cardType);
        await this.creditCardNumberInput.fill(details.creditCardNumber);
        await this.creditCardMonthInput.fill(details.creditCardMonth);
        await this.creditCardYearInput.fill(details.creditCardYear);
        await this.nameOnCardInput.fill(details.nameOnCard);
    }

    async clickPurchase() {
        await this.purchaseFlightBtn.click();
    }

    async getConfirmationText() {
        const message = await this.confirmationMessage.textContent();
        return message ? message.trim() : '';
    }
}

module.exports = { FlightSearchPage };
