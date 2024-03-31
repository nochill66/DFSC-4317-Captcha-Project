const { test, expect } = require('@playwright/test');

// Function to register a user
test('Register User', async ({ page }) => {

    await page.goto('http://localhost:64266/');
    await page.getByRole('link', { name: 'Register' }).click();
    await expect(page).toHaveTitle(/Register/);
    
    // Registration variables
    const username = `Hacker`;
    const password = '12345678'; 
    
    let taken = await page.locator('.text-danger', {'text': 'Name Hacker is already taken.'})

    while (!taken) {
        // Fill out Registration Form
        await page.getByLabel('User name').click();
        await page.getByLabel('User name').fill(username);
        await page.getByLabel('Password', { exact: true }).click();
        await page.getByLabel('Password', { exact: true }).fill(password);
        await page.getByLabel('Confirm password').click();
        await page.getByLabel('Confirm password').fill(password);
        await page.getByRole('button', { name: 'Register' }).click();

        // Verify registration success
        await expect(page).toHaveTitle(/Log in/); 
    }

    // Close the page
    page.close();
    console.error("Success: Username has been inputed");

});
