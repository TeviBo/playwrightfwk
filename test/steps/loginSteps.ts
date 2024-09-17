import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";

import { expect } from "@playwright/test";
import { pageFixture } from "../../src/hooks/pageFixture";

setDefaultTimeout(60 * 1000 * 2)

Given('User navigates to the application', async () => {
    await pageFixture.page.goto("https://demoqa.com/login");
});

Given('User enter the username as {string}', async (username: string) => {
    await pageFixture.page.locator("id=userName").fill(username);
});

Given('User enter the password as {string}', async (password: string) => {
    await pageFixture.page.locator("id=password").fill(password);
})

When('User click on the login button', async () => {
    await pageFixture.page.locator("id=login").click();
    await pageFixture.page.waitForLoadState();
});


Then('Login should be success', () => {
    const user = pageFixture.page.locator("id=userName-value");
    expect(user).toBeVisible();
})

When('Login should fail', () => {
    const failureMesssage = pageFixture.page.locator("id=name");
    expect(failureMesssage).toBeVisible();
});

