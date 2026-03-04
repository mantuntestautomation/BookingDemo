const { expect } = require('@playwright/test');

/**
 * Validates if an element is visible with retry logic
 * @param {Locator} element - The element to validate
 * @param {string} elementName - Descriptive name of the element
 * @param {number} retryCount - Number of retry attempts (default: 2)
 * @param {number} delayMs - Delay in milliseconds between retries (default: 1000)
 * @returns {boolean} - Returns true if element is visible
 * @throws {Error} - Throws error if element is not visible after all retries
 */
async function validateElementVisible(element, elementName, retryCount = 2, delayMs = 1000) {
    let lastError;
    
    for (let i = 0; i < retryCount; i++) {
        try {
            await expect(element).toBeVisible({ timeout: 5000 });
            console.log(`✓ Element "${elementName}" is visible`);
            return true;
        } catch (error) {
            lastError = error;
            console.log(`Attempt ${i + 1} failed for element "${elementName}". Retrying...`);
            
            if (i < retryCount - 1) {
                await new Promise(r => setTimeout(r, delayMs));
            }
        }
    }
    
    // If all retries failed, throw error with appropriate message
    throw new Error(
        `Element "${elementName}" is not visible after ${retryCount} attempts. ` +
        `Last error: ${lastError.message}`
    );
}

module.exports = { validateElementVisible };
