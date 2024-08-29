import { Before, After, BeforeAll, AfterAll, Status } from '@cucumber/cucumber'
import { chromium, Browser, BrowserContext } from '@playwright/test';
import { pageFixture } from './pageFixture';

let browser: Browser;
let context: BrowserContext;


BeforeAll(async () => {
    browser = await chromium.launch({ headless: false });
});

Before(async () => {
    context = await browser.newContext();
    const page = await context.newPage();
    pageFixture.page = page;
});

After(async ({ pickle, result }) => {
    // screenshot
    if (result?.status === Status.FAILED) {
        const img = await pageFixture.page.screenshot({ path: `./test-results/screenshots/${pickle.name}.png`, type: "png" });
        // @ts-ignore
        await this.attach(img, "image/png");
    }
    await pageFixture.page.close();
    await context.close();

});

AfterAll(async () => {
    await browser.close();
});