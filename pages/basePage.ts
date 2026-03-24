import { Page, Locator, expect } from '@playwright/test';
export class basePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async click(locator: Locator) {
       await locator.waitFor({ state: 'visible' });
        await locator.click();
    }

    async fill(locator: Locator, text: string) {
       // await locator.waitFor({ state: 'visible' });
        await locator.fill(text);
    }
    async type(locator: Locator, text: string) {
        // await locator.waitFor({ state: 'visible' });
        // await locator.fill(text);
         await locator.type(text, { delay: 100 });
     }
    

    async expectUrl(url: string) {
        await expect(this.page).toHaveURL(url);
    }
    async navigate(url: string) {
        await this.page.goto(url);
    }

    async expectHeadingVisible(headingText: string) {
        await expect(this.page.getByRole('heading', { name: headingText })).toBeVisible();
    }

    async expectNotUrl(url: string) {
        await expect(this.page).not.toHaveURL(/url/);
    }

 
}
