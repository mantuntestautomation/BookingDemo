const { test, expect } = require('@playwright/test');

test.describe('API Integration Demo', () => {
    
    test('GET - Validate flight destinations list', async ({ request }) => {
        // Since BlazeDemo is a simple PHP app, it doesn't have a formal REST API, 
        // but we can demonstrate the request context.
        const response = await request.get('https://blazedemo.com/');
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        
        const body = await response.text();
        expect(body).toContain('Welcome to the Simple Travel Agency!');
    });

    test('POST - Demonstrate form submission via API', async ({ request }) => {
        const response = await request.post('https://blazedemo.com/reserve.php', {
            form: {
                fromPort: 'Paris',
                toPort: 'Buenos Aires'
            }
        });
        
        expect(response.ok()).toBeTruthy();
        const body = await response.text();
        expect(body).toContain('Flights from Paris to Buenos Aires:');
    });
});
