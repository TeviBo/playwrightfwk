import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";

import { expect } from "@playwright/test";
import { pageFixture } from "../../src/hooks/pageFixture";

setDefaultTimeout(60 * 1000 * 2)

Given('User navigates to the application', function () {
    pageFixture.page.goto("https://opencart.abstracta.us/");
});

Given('User click on the login link', function () {
    pageFixture.page.locator("//a[@title='My Account']").click();
    pageFixture.page.locator("//a[normalize-space(text())='Login']").click();
});

Given('User enter the username as {string}', function (username: string) {
    pageFixture.page.locator("id=input-email").fill(username);
});

Given('User enter the password as {string}', function (password: string) {
    pageFixture.page.locator("id=input-password").fill(password);
})

When('User click on the login button', function () {
    pageFixture.page.locator("input[value='Login']").click();
    pageFixture.page.waitForLoadState();
});


Then('Login should be success', function () {
    const user = pageFixture.page.locator("i.fa.fa-phone");
    expect(user).toBeVisible();
})

When('Login should fail', function () {
    const failureMesssage = pageFixture.page.locator("//div[normalize-space(text())='Warning: No match for E-Mail Address and/or Password.']");
    expect(failureMesssage).toBeVisible();
});

