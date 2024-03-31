const { chromium } = require('playwright');
const { test, expect } = require('@playwright/test');
const Tesseract = require('tesseract.js');


const download = (url, path) => {
    request.head(url, (err, res, body) => {
        if (err) {
            console.error('Error:', err);
            return;
        }
        request(url)
            .pipe(fs.createWriteStream(path))
            .on('close', () => {
                console.log('File downloaded to:', path);
            });
    });
};

async function convertToText(imagePath) {
    try {
        let imgText = await Tesseract.recognize(imagePath);

        // Log the recognized text
        console.log(`Converted text from image is: ${imgText.data.text}`);

        // Return the recognized text
        return imgText.data.text;
    } catch (error) {
        // Handle errors during text recognition
        console.error('Error during text recognition:', error);
        return null;
    }
}


test('Navigate to Landing Page', async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:50992/');
    await expect(page).toHaveTitle(/Home Page/);
});

test('Multiple Tabs', async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:50992/');
    await expect(page).toHaveTitle(/Home Page/);

    const newPage = await browser.newPage();
    await newPage.goto('http://localhost:50992/Account/Login');
    
    await newPage.close();
    await browser.close();
});


test('Go to Login Page', async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:50992/');
    await expect(page).toHaveTitle(/Home Page/);

    // Navigate to Login Page
    await page.getByRole('button', { name: 'Begin Her' }).click();
    await expect(page).toHaveTitle(/Log in/);
});

test('OCR Login Submission', async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    let loggedIn = false;
    const maxAttempts = 5; // Maximum number of login attempts
    let attempt = 0;

    while (!loggedIn && attempt < maxAttempts) {
        attempt++;

        await page.goto('http://localhost:50992/');
        await page.getByRole('button', { name: 'Begin Here' }).click();
        await expect(page).toHaveTitle(/Log in/);

        // Placeholder code for entering credentials
        await page.getByLabel('User name').click();
        await page.getByLabel('User name').fill('temp');
        await page.getByLabel('Password').click();
        await page.getByLabel('Password').fill('temp1234');

        // Code to handle CAPTCHA image
        await page.locator('img#c_account_login_maincontent_examplecaptcha_CaptchaImage').screenshot({ path: "captcha.png" });
        const captchaText = await convertToText('captcha.png');
        console.log(`Captcha text: ${captchaText}`);

        await page.getByLabel('captcha').fill(captchaText); // Fill CAPTCHA input field with the extracted text

        // Click the login button
        await page.click('[type="submit"]');

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
        console.error('Maximum number of login attempts reached. Login failed.');
    }
});

test('Get Audio File', async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    const filePath = ''; // Replace with the path where you want to save the file

    let loggedIn = false;
    const maxAttempts = 1; // Maximum number of login attempts
    let attempt = 0;

    while (!loggedIn && attempt < maxAttempts) {
        attempt++;

        await page.goto('http://localhost:50992/');
        await page.getByRole('button', { name: 'Begin Here' }).click();
        await expect(page).toHaveTitle(/Log in/);

        // Placeholder code for entering credentials
        await page.getByLabel('User name').click();
        await page.getByLabel('User name').fill('temp');
        await page.getByLabel('Password').click();
        await page.getByLabel('Password').fill('temp1234');

        // Find captcha audio
        // await page.locator('#c_account_login_maincontent_examplecaptcha_SoundLink');
        const linkElement = await page.$('a.BDC_SoundLink');

        if (linkElement) {

            // Get the value of the 'href' attribute
            const website = "http://localhost:50992/";
            const partialAudio = await linkElement.getAttribute('href');
            const audioUrl = website + partialAudio;
            console.log("Download link:", audioUrl);

            download(audioUrl, filePath);

        } else {
            console.log("Link not found");
        }

        // Click the login button
        await page.click('[type="submit"]');

        // Check if the title is 'Home Page'
        const pageTitle = await page.title();
        if (pageTitle === 'Home Page') {
            loggedIn = true;
        }
    }
    
    if (!loggedIn) {
        console.log('Failed: Could not log in as user');
    }
    else {
        console.log('Success: Logged in as user');
    }
});

test('Transcribe Audio File', async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    const filePath = ''; // Replace with the path where you want to save the file

    let loggedIn = false;
    const maxAttempts = 1; // Maximum number of login attempts
    let attempt = 0;

    while (!loggedIn && attempt < maxAttempts) {
        attempt++;

        await page.goto('http://localhost:50992/');
        await page.getByRole('button', { name: 'Begin Here' }).click();
        await expect(page).toHaveTitle(/Log in/);

        // Placeholder code for entering credentials
        await page.getByLabel('User name').click();
        await page.getByLabel('User name').fill('temp');
        await page.getByLabel('Password').click();
        await page.getByLabel('Password').fill('temp1234');

        // Find captcha audio
        // await page.locator('#c_account_login_maincontent_examplecaptcha_SoundLink');
        const linkElement = await page.$('a.BDC_SoundLink');

        if (linkElement) {

            // Get the value of the 'href' attribute
            const website = "http://localhost:50992/";
            const partialAudio = await linkElement.getAttribute('href');
            const audioUrl = website + partialAudio;
            console.log("Download link:", audioUrl);

            download(audioUrl, filePath);

        } else {
            console.log("Link not found");
        }

        // Click the login button
        await page.click('[type="submit"]');

        // Check if the title is 'Home Page'
        const pageTitle = await page.title();
        if (pageTitle === 'Home Page') {
            loggedIn = true;
        }
    }
    
    if (!loggedIn) {
        console.log('Failed: Could not log in as user');
    }
    else {
        console.log('Success: Logged in as user');
    }
});