import { test, expect } from '@playwright/test';
import path from 'path';

//const baseURL = 'https://selenium-prd.firebaseapp.com/';


test.describe('Login Tests', () => {

  // Test Case 1: Valid Credentials
  test.beforeEach('Login with valid credentials', async ({ page }) => {
    await page.goto('https://selenium-prd.firebaseapp.com/');

    await page.fill('#email_field', 'admin123@gmail.com'); // valid username
    await page.fill('#password_field', 'admin123'); // valid password
    await page.locator("//button[contains(text(),'Login')]").click();
    await page.getByRole('link', { name: 'Home' }).click();
  });

    //Mouse Hover
    test('Mouse Hover', async ({ page }) => {
    const switchTo =page.getByText('Switch To');
    await switchTo.hover();
    const options = page.locator("//div[contains(@class,'dropdown-content')]/a");
    await expect(options.first()).toBeVisible();
    await page.screenshot({ path: 'screenshots/mouse-hover.png'  });
    
    });
    

    //Tool Tip
    test('Tool Tip', async ({ page }) => {
    await page.getByText('Intractions').hover();
    await page.getByText('Tool Tip').click();
    //await page.waitForTimeout(3000);
    const tooltip = await page.locator("//div[contains(text(),'Right')]").textContent();
    console.log(tooltip);
    await page.locator("//div[contains(text(),'Right')]").hover(); 
    await expect(page.locator("//div[contains(text(),'Right')]")).toBeVisible();
    await expect(page.locator("//span[contains(text(),'Right')]")).toHaveText('Right');
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'screenshots/tool-tip.png' });

    });

    //File Upload
    test('File Upload', async ({ page }) => {
    await page.locator("//a[text()='File Upload']").click();
   // const filePath = path.resolve(__dirname, '../utils/hello.txt');
    const filePath = path.join(process.cwd(), '/utils/hello.txt');
    await page.waitForTimeout(2000);
    await page.setInputFiles('#logo', filePath);
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'screenshots/file-upload.png' });
    // Validation
    //const uploadedFileName = await page.textContent('#uploadedFileName');
    //expect(uploadedFileName).toContain('hello.txt');
    });

    //Double Click
    test('Double Click', async ({ page }) => {
      await page.getByText('Intractions').hover();
    await page.locator("//a[text()='Double Click']").click();
    //await page.locator("//button[text()='Double Click']").dblclick();
    //await page.waitForTimeout(2000);
    const dblBtn = page.getByRole('button', { name: 'Double Click' });
    await dblBtn.waitFor({ state: 'visible' });
    await dblBtn.dblclick();
    await expect(page.locator('#Selenium')).toHaveText('Count   =  1');
    await page.screenshot({ path: 'screenshots/double-click.png' });
    });

    //Window Alert
    test('Window Alert', async ({ page }) => {
    await page.locator("//button[contains(text(),'Switch To')]").hover();
    await page.locator("//a[text()='Alert']").click();
    page.once('dialog', async dialog => {
      const alertMessage = dialog.message();   
      console.log(alertMessage);
      await expect(alertMessage).toContain('Hello! I am an alert box!'); //Validation
      await dialog.accept();           
    });
    await page.locator("//button[contains(text(),'Window Alert')]").click();
    await page.screenshot({ path: 'screenshots/window-alert.png' });
  });

  

  test('Prompt Alert', async ({ page }) => {
    //Promt Alert
    await page.locator("//button[contains(text(),'Switch To')]").hover();
    await page.locator("//a[text()='Alert']").click();
    page.once('dialog', async dialog => {
      const alertMessage = dialog.message();  
      console.log(alertMessage); 
      await expect(alertMessage).toContain('Please enter your name:'); //Validation
      await dialog.accept("Harry Potter");           
    });
    //await page.locator("//button[contains(text(),'Promt Alert')]").click();
    const promptBtn = page.getByRole('button', { name: 'Promt Alert' });
    await promptBtn.waitFor({ state: 'visible' });
    await promptBtn.click();
   //Validation
   const message = page.locator("//p[contains(text(),'Hello')]");
   await expect(message).toHaveText('Hello Harry Potter! How are you today?');
   //await expect(page.locator("p")).toContainText('Hello Harry Potter');
   await page.screenshot({ path: 'screenshots/prompt-alert.png' });
  });
});





    // Verify successful login
    //await expect(page).toHaveURL('dashboard'); // URL contains 'dashboard'
    //await expect(page.getByRole('heading', { name: 'Campaigns' })).toBeVisible();
    //await page.waitForTimeout(2000);
 
/*
  // Test Case 2: Invalid Credentials
  loginData.forEach(({ username, password, expected }) => {
    test.only(`Login test with ${username || 'empty'} credentials`, async ({ page }) => {
    await page.goto('/');

    await page.fill('#username', username); // invalid username
    await page.fill('#inputPassword', password); // invalid password
   
    await page.locator("//button[contains(text(),'Sign In')]").click();

    // Verify login failed
    //await expect(page.locator('text=Invalid Credentials')).toBeVisible();
   //await expect(page).not.toHaveURL(/dashboard/); // Should not navigate to dashboard

  /* page.on('dialog', async (dialog) => {
    // Verify error message
    expect(dialog.message()).toContain('to this site');*/
   // await expect(page.locator('text=to this site')).toBeVisible();

  // await expect(page.locator('text=to this site')).toBeVisible();
  //await expect(page.getByText('this site', { exact: false })).toBeVisible();

/*await expect(page).not.toHaveURL(/dashboard/);
  
   await page.waitForTimeout(2000);
  });
  
});*/

