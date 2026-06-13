/**
 * Application-wide constants for the BookingDemo framework.
 */
const APP_CONSTANTS = {
    TITLES: {
        MAIN_PAGE: 'BlazeDemo',
        CONFIRMATION_PAGE: 'BlazeDemo Confirmation'
    },
    MESSAGES: {
        PURCHASE_SUCCESS: 'Thank you for your purchase today!'
    },
    TIMEOUTS: {
        SHORT: 5000,
        MEDIUM: 10000,
        LONG: 30000
    },
    ENDPOINTS: {
        PURCHASE: '/purchase.php',
        CONFIRMATION: '/confirmation.php'
    }
};

module.exports = { APP_CONSTANTS };
