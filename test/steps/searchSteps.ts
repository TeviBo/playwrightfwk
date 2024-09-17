import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";

import { expect } from "@playwright/test";
import { pageFixture } from "../../src/hooks/pageFixture";

setDefaultTimeout(60 * 1000 * 2)

When('the user click go to store button', async () => {
    await pageFixture.page.locator("id=gotoStore").click();
});
Then('user is redirected to the book store', () => {
    const data = pageFixture.page.locator(".rt-noData");
    expect(data).toBeHidden();
});

Given('user search for a {string}', async (product) => {
    await pageFixture.page.locator("[name='search']").fill(product);
    await pageFixture.page.locator("i.fa.fa-search").click();
});
When('user add the product to the cart', async () => {
    await pageFixture.page.locator("//span[normalize-space(text())='Add to Cart']").click();

});
Then('the cart badge should get updated', () => {
    expect(pageFixture.page.locator("div.alert.alert-success.alert-dismissible").isVisible());
});