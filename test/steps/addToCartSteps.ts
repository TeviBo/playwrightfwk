import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";

import { expect } from "@playwright/test";
import { pageFixture } from "../../src/hooks/pageFixture";

setDefaultTimeout(60 * 1000 * 2)


Given('user search for a {string}', async function (product) {
    await pageFixture.page.locator("[name='search']").fill(product);
    await pageFixture.page.locator("i.fa.fa-search").click();
});
When('user add the product to the cart', async function () {
    await pageFixture.page.locator("//span[normalize-space(text())='Add to Cart']").click();

});
Then('the cart badge should get updated', async function () {
    expect(pageFixture.page.locator("div.alert.alert-success.alert-dismissible").isVisible());
    const badgeCount = await pageFixture.page.locator("id=cart-total").textContent();
    const amount = badgeCount?.split(" ", 1)
    expect(Number(amount)).toBeGreaterThan(0);
});