import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";

import { chromium, Page, Browser, expect } from "@playwright/test";

let browser: Browser
let page: Page

setDefaultTimeout(60 * 1000 * 2)

Given('User navigates to the application', async function () {
    browser = await chromium.launch({headless: false});
    page = await browser.newPage();
    await page.goto("https://opencart.abstracta.us/");
})

Given('User click on the login link', async function () {
    await page.locator("//a[@title='My Account']").click();
    await page.locator("//a[normalize-space(text())='Login']").click();
});

Given('User enter the username as {string}', async function (username: string) {
    await page.locator("id=input-email").fill(username);
});

Given('User enter the password as {string}', async function (password: string) {
    await page.locator("id=input-password").fill(password);
})

When('User click on the login button', async function () {
    await page.locator("input[value='Login']").click();
    await page.waitForLoadState();
});


Then('Login should be success', async function () {
    const user = page.locator("i.fa.fa-phone");
    await expect(user).toBeVisible();
    const userName = await user.textContent();
    console.log("Username: " + userName);
})

When('Login should fail', async function () {
    const failureMesssage = page.locator("//div[normalize-space(text())='Warning: No match for E-Mail Address and/or Password.']");
    await expect(failureMesssage).toBeVisible();
});

