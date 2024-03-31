const { test, expect } = require('@playwright/test');


test('On homepage', async ({ page }) => {
    await page.goto('http://localhost:64266/');
    await expect(page).toHaveTitle(/Test Site/);
});

test('Go to Login Page', async ({ page }) => {
    await page.goto('http://localhost:64266/');
    await page.getByRole('button', { name: 'Begin Here' }).click();
    await expect(page).toHaveTitle(/Log in/);
});


test('reCaptcha Appeared', async ({ page }) => {
    // test.setTimeout(0000);
    let loggedIn = false;
    const maxAttempts = 1; // Maximum number of login attempts
    let attempt = 0;

    while (!loggedIn && attempt < maxAttempts) {
        attempt++;

        await page.goto('http://localhost:64266/');
        
        // Set the viewport size to fullscreen
        // await page.setViewportSize({ width: 1920, height: 1080 }); 

        await page.getByRole('button', { name: 'Begin Here' }).click();
        await expect(page).toHaveTitle(/Log in/);

        // User credentials
        await page.getByLabel('User name').click();
        await page.getByLabel('User name').fill('12345678');
        await page.getByLabel('Password').click();
        await page.getByLabel('Password').fill('12345678');

        // reCaptcha handler
        const captchaFrame = await page.waitForSelector('iframe[title="reCAPTCHA"]');  // Wait for the CAPTCHA element to load
        const captchaFrameContent = await captchaFrame.contentFrame(); // Switch to the CAPTCHA iframe
        const captchaCheckbox = await captchaFrameContent.waitForSelector("#recaptcha-anchor"); // Wait for the CAPTCHA checkbox to appear

        // Click the CAPTCHA checkbox
        await captchaCheckbox.click();

        // Wait for the CAPTCHA checkbox to be checked
        await captchaCheckbox.waitForElementState('visible');

        // Check if the title is 'Home Page'
        const pageTitle = await page.title();
        if (pageTitle === 'Home Page') {
            loggedIn = true;
            console.log('Login succeeded.');
        } else {
            console.log(`Login attempt ${attempt} failed.`);
        }
    }

    // Log messages after page closes
    // page.close();

    if (!loggedIn) {
        console.error('Point in progress: Got reCaptcha to show');
        console.error('Next Step: Get to audio option');
    }
    else {
        console.log('Success: Logged into user');
    }
    
});



test('Audio Option', async ({ page }) => {
    test.setTimeout(8000);
    let loggedIn = false;
    const maxAttempts = 1; // Maximum number of login attempts
    let attempt = 0;

    while (!loggedIn && attempt < maxAttempts) {
        attempt++;

        await page.goto('http://localhost:64266/');
        
        // Set the viewport size to fullscreen
        // await page.setViewportSize({ width: 1920, height: 1080 }); 

        await page.getByRole('button', { name: 'Begin Here' }).click();
        await expect(page).toHaveTitle(/Log in/);

        // User credentials
        await page.getByLabel('User name').click();
        await page.getByLabel('User name').fill('12345678');
        await page.getByLabel('Password').click();
        await page.getByLabel('Password').fill('12345678');

        // reCaptcha handler
        const captchaFrame = await page.waitForSelector('iframe[title="reCAPTCHA"]');  // Wait for the CAPTCHA element to load
        const captchaFrameContent = await captchaFrame.contentFrame(); // Switch to the CAPTCHA iframe
        const captchaCheckbox = await captchaFrameContent.waitForSelector("#recaptcha-anchor"); // Wait for the CAPTCHA checkbox to appear

//         // Click the CAPTCHA checkbox
        await captchaCheckbox.click();

//         // Wait for the CAPTCHA checkbox to be checked
        await captchaCheckbox.waitForElementState('visible');

        // Check if the title is 'Home Page'
        const pageTitle = await page.title();
        if (pageTitle === 'Home Page') {
            loggedIn = true;
            console.log('Login succeeded.');
        } else {
            console.log(`Login attempt ${attempt} failed.`);
        }
    }

    if (!loggedIn) {
        console.error('Point in progress: Got reCaptcha to show');
        console.error('Next Step: Get to audio option');

        // Get audio from reCaptcha

        // Gives error trying to get the button

        // Go into iframe
        const audioFrame = await page.waitForSelector('iframe[title="recaptcha challenge expires in two minutes"]');  // Wait for the CAPTCHA element to load
        const audioFrameContent = await audioFrame.contentFrame(); 

        // Click button in iframe
        const audioButton = await page.locator("Get an audio challenge");
        await audioButton.click();
        
        // Where is the button ???? (in iFrame and click or out of iFrame and click)
    }
    else {
        console.log('Success: Logged into user');
    }
});
