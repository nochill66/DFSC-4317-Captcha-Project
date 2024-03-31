const { test, expect } = require('@playwright/test');
const Tesseract = require('tesseract.js');

async function convertToText(imagePath) {
  try {
      
      let imgText = await Tesseract.recognize(imagePath); // Perform OCR on the binarized image
      console.log(`Converted text from image is: ${imgText.data.text}`); // Log the recognized text
      return imgText.data.text; // Return the recognized text
  } catch (error) {
      console.error('Error during text recognition:', error); // Handle errors during text recognition
      return null;
  }
}

test('Tesseract Check', async ({ page }) => {

  // Code to handle CAPTCHA image
  const captchaText = await convertToText('Test.png');
  console.log(`Captcha text: ${captchaText}`);

});

test('Website Image', async ({ page }) => {

  // Code to handle CAPTCHA image
  const captchaText = await convertToText('test2.jpg');
  console.log (`Captcha Text: BJX9X`)
  console.log(`Tesseract text: ${captchaText}`);

});