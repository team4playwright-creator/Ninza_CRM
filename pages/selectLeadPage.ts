import { basePage } from './basePage';
import { Page, Locator, expect } from '@playwright/test';

export class selectLeadPage extends basePage {
    readonly heading: Locator;
    readonly tableRows: Locator;

    constructor(page: Page) {
        super(page);
        this.heading = page.locator('h3:has-text("Select a Lead")'); // or whatever modal heading exists
        this.tableRows = page.locator('table tbody tr');
    }

    async expectVisible() {
        await expect(this.heading).toBeVisible();
    }

    async selectLeadFromTable(leadName: string) {
        await this.expectVisible();
        await this.page.waitForSelector('table'); // wait for table

        while (true) {
        // find the row that contains the lead name in second column
        const row = this.tableRows.filter({ hasText: leadName });

        const count = await row.count();
        if (count > 0) {
            // click the Select button inside that row
            await row.first().locator('button.select-btn').click();
            console.log(`Lead "${leadName}" selected`);
            return;
        }

        // Handle pagination if table has next button
        const nextBtn = this.page.locator('button:has-text("Next")');
        const isDisabled = await nextBtn.isDisabled();
        if (isDisabled) {
            throw new Error(`Lead "${leadName}" not found in the table`);
        }

        await nextBtn.click();
        await this.page.waitForLoadState('networkidle');
    }
}
}