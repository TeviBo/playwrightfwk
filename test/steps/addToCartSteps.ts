import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";

import { expect } from "@playwright/test";
import { pageFixture } from "../../src/hooks/pageFixture";

setDefaultTimeout(60 * 1000 * 2)


Given('user search for a {string}', function (product) {
 pageFixture.page.locator("[name='search']").fill(product);
 pageFixture.page.locator("i.fa.fa-search").click();
});
When('user add the product to the cart', function () {
 pageFixture.page.locator("//span[normalize-space(text())='Add to Cart']").click();

});
Then('the cart badge should get updated', function () {
    expect(pageFixture.page.locator("div.alert.alert-success.alert-dismissible").isVisible());
});