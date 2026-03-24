import { basePage } from './basePage';
import { Page, Locator, expect } from '@playwright/test';

export class selectcampaignPage extends basePage {
    readonly selectCampaignHeading: Locator;
    readonly searchCriteriaDropdown: Locator;
    readonly searchInput: Locator;
   
    readonly tableRows: Locator;

    constructor(page: Page) {
        super(page);
        this.selectCampaignHeading = page.locator('h3:has-text("Select a Campaign")');
        this.searchCriteriaDropdown = page.locator('#search-criteria');
        this.searchInput = page.locator('#search-input');
       

      

   
    }

    async expectSelectCampaignVisible() {
        await expect(this.selectCampaignHeading).toBeVisible();
    }

   

    // Fill search input
    async enterSearchValue(value: string) {
        await this.fill(this.searchInput, value);
    }


   //  Click select button in table row by campaignId
   async selectCampaignFromTable(campaignId: string) {

    //const rowLocator = this.page.locator(`tr:has(td:has-text("${campaignId}")) button.select-btn`);
    //await this.click(rowLocator);
    while (true) {
        // Check if the campaign exists on the current page
        await this.page.waitForSelector('table'); // wait for table itself
    await this.page.waitForTimeout(500);  
        const rowLocator = this.page.locator(`tr:has(td:has-text("${campaignId}")) button.select-btn`);
        const count = await rowLocator.count();

        if (count > 0) {
            // Campaign found, click the button
            await rowLocator.first().click();
            console.log(`Campaign ${campaignId} selected`);
            return;
        }

        // Check if "Next" button is disabled
        const nextBtn = this.page.locator('button:has-text("Next")');
        const isDisabled = await nextBtn.isDisabled();

        if (isDisabled) {
            throw new Error(`Campaign ${campaignId} not found in the table`);
        }

        // Go to next page
        await nextBtn.click();
        await this.page.waitForLoadState('networkidle'); // wait for table to load
    }
}
async waitForTableDisplay(campaignId: string) {
    await this.page.waitForSelector(`tr:has(td:has-text("${campaignId}")) button.select-btn`);
}

  
  

    // selectCampaignPage.ts
async selectSearchCriteria(criteria: string) {
    await this.page.selectOption('#search-criteria', criteria);
}

}



