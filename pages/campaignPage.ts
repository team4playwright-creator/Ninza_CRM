import { basePage } from './basePage';
import { Page, Locator } from '@playwright/test';

export class campaignPage extends basePage {
    readonly expectedCloseDate: Locator;
    readonly createCampaign: Locator;
    readonly  date: Locator;
    readonly campaignName: Locator;
    readonly targetSize: Locator;
    readonly submitButton: Locator;
    readonly tableRows: Locator;


    constructor(page: Page) {
        super(page);
        this.expectedCloseDate = page.locator('input[name="name"]');
        this.createCampaign=page.locator("//span[text()='Create Campaign']");
       this.date=page.locator("//input[@name='expectedCloseDate']");
       this.campaignName = page.locator('input[name="campaignName"]');
       this.targetSize = page.locator('input[name="targetSize"]');
       this.submitButton = page.locator('button[type="submit"]');
       this.tableRows = page.locator('table.table-striped.table-hover tbody tr');
   
    }

   
       /* async selectDate(date: string) {
          //  await this.dateInput.click();
            //await this.page.locator(`text="${date}"`).click();
            await this.fill(this.date, date);

        }*/

    async createCampaignPage() {
      
        await this.click(this.createCampaign);
    }

    async formFill(campaignData: any,campaignName:string) {
        await this.fill(this.campaignName, campaignName);
        await this.fill(this.targetSize, campaignData.targetSize);
       // await this.selectDate("2026-03-10");
        await this.fill(this.date, campaignData.expCloseDate);

    }
    async clickSubmit() {
        await this.click(this.submitButton);
     
      //  await this.page.waitForNavigation();
    }
    async waitForTable() {
        await this.tableRows.first().waitFor({ state: 'visible' });
    }
    async validateLeadInTable(campaignName: string) {
    
        const campaignNames = await this.tableRows.locator('td:nth-child(2)').allTextContents();
    
        // Check if the specific campaign name exists
        if (!campaignNames.includes(campaignName)) {
            throw new Error(`Campaign "${campaignName}" not found in the table`);
        } else {
            console.log(`Campaign "${campaignName}" is successfully displayed in the table`);
        }
    }
 

   
}