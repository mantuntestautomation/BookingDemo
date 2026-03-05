**Playwright-JS Tests Automation Framework:**
This project uses a well-structured and scalable Playwright test framework with the following components:

**Core Setup**
Download software - Install latest version of node js.
Playwright set up - install npm init playwright for 1st time project set up.
Playwright Test Runner – Uses Playwright’s built-in test runner for easy parallel execution and reporting.
playwright.config.js – Centralized configuration file for global settings like timeouts, retries, reporter setup, and projects.
package.json – Manages dependencies, test scripts, and environment-specific commands.

**Test Structure & Utilities**
Page Object Model – Test classes are separated from Page classes to keep test logic clean and reusable.
Page Utils – Common utility functions are extracted for reuse across tests.

**Environment Management**
Environment - Maintains separate files for dev and qa environments.
cross-env – Uses cross-env package for managing environmenyt variable across different platforms (Command: npm install cross-env).
dotenv – Uses dot env package to manage environment variables (Command: npm install dotenv).
globalSetup.js - Utility function used for environment set up based on the selected environment

**Test Enhancements**
Tag based execution – Use tags @regression to run specific sets of tests.
Screenshots on Pass/Fail – Takes screenshots at the end of every test and attaches them to the Playwright HTML report.
Video Recording on Failure – Automatically records videos when tests fail for easier debugging.
Parallel Execution – Configured for cross-browser parallel execution across Chromium, Firefox, and WebKit.

**Test Data Management**
JSON-based Test Data – Page classes consume dynamic data stored in JSON files to support test data-driven development.
Faker.js Integration – Generates random test data like names, email etc., dynamically.

**Running Tests**
To run tests in different environments with different browsers, you can use the following command structure:
npm run test:sit -- --grep=@Regression
