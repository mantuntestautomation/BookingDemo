const { expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');

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

    async validateDepartureArrivalHeaders() {
        const source = await this.resultSource.first().textContent();
        const destination = await this.resultDestination.first().textContent();
        return {
            source: source ? source.trim().replace('Departs: ', '') : '',
            destination: destination ? destination.trim().replace('Arrives: ', '') : ''
        };
    }

    async selectChooseThisFlight() {
        // count available "Choose This Flight" buttons and click a random one
        const buttons = await this.chooseThisFlightBtn.all();
        const count = buttons.length;
        if (count === 0) {
            throw new Error('No flights available to choose');
        }
        const randomIndex = this.getRandomIndex(count);
        await buttons[randomIndex].click();
    }

    generateRandomPassengerDetails() {
        const cardTypes = ['visa', 'American Express'];
        const randomCardType = cardTypes[this.getRandomIndex(cardTypes.length)];
        
        return {
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
    }
    
    async fillPassengerDetails(details) {
        const passengerDetails = details || this.generateRandomPassengerDetails();
        
        await this.nameInput.fill(passengerDetails.name);
        await this.addressInput.fill(passengerDetails.address);
        await this.cityInput.fill(passengerDetails.city);
        await this.stateInput.fill(passengerDetails.state);
        await this.zipCodeInput.fill(passengerDetails.zipCode);
        await this.cardTypeSelect.selectOption(passengerDetails.cardType);
        await this.creditCardNumberInput.fill(passengerDetails.creditCardNumber);
        await this.creditCardMonthInput.fill(passengerDetails.creditCardMonth);
        await this.creditCardYearInput.fill(passengerDetails.creditCardYear);
        await this.nameOnCardInput.fill(passengerDetails.nameOnCard);
        
        return passengerDetails;
    }

    async clickPurchaseFlight() {
        await this.purchaseFlightBtn.click();
    }

    async getConfirmationMessage() {
        const message = await this.confirmationMessage.textContent();
        return message.trim();
    }
    
}

module.exports = { FlightSearchPage };
