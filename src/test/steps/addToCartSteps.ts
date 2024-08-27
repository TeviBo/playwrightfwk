import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";

import { Page, expect } from "@playwright/test";

let page: Page
setDefaultTimeout(60 * 1000 * 2)


Given('user search for a {string}', async function (product: string) {
    await page.locator("input[placeholder='Search']").fill(product);
    await page.locator("button").click();
    await page.waitForTimeout(2000);
});
When('user add the product to the cart', async function () {
    await page.locator("//span[normalize-space(text())='Add to Cart']").click();
    const toast = page.locator("simple-snack-bar");
    await expect(toast).toBeVisible();
    await toast.waitFor({ state: "hidden" })
});
Then('the cart badge should get updated', async function () {
    const badgeCount = await page.locator("id=cart-total").textContent();
    const amount = badgeCount?.split(" ", 0)
    console.log("Amount: " + amount);
    expect(Number(amount)).toBeGreaterThan(0);
});