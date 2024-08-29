import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";

import { expect } from "@playwright/test";
import { pageFixture } from "../../src/hooks/pageFixture";

setDefaultTimeout(60 * 1000 * 2)

Given('User navigates to the application', async function () {
    await pageFixture.page.goto("https://opencart.abstracta.us/");
})

Given('User click on the login link', async function () {
    await pageFixture.page.locator("//a[@title='My Account']").click();
    await pageFixture.page.locator("//a[normalize-space(text())='Login']").click();
});

Given('User enter the username as {string}', async function (username: string) {
    await pageFixture.page.locator("id=input-email").fill(username);
});

Given('User enter the password as {string}', async function (password: string) {
    await pageFixture.page.locator("id=input-password").fill(password);
})

When('User click on the login button', async function () {
    await pageFixture.page.locator("input[value='Login']").click();
    await pageFixture.page.waitForLoadState();
});


Then('Login should be success', async function () {
    const user = pageFixture.page.locator("i.fa.fa-phone");
    await expect(user).toBeVisible();
})

When('Login should fail', async function () {
    const failureMesssage = pageFixture.page.locator("//div[normalize-space(text())='Warning: No match for E-Mail Address and/or Password.']");
    await expect(failureMesssage).toBeVisible();
});

