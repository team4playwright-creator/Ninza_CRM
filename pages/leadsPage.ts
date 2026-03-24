import { basePage } from './basePage';
import { Page, Locator } from '@playwright/test';

export class leadsPage extends basePage {
    readonly leadsName: Locator;
    readonly leadsCompany: Locator;
    readonly leadsLeadSource: Locator;
    readonly leadsIndustry: Locator;
    readonly leadsPhone: Locator;
    readonly leadsLeadStatus: Locator;
    readonly createLead: Locator;
    readonly addCampaignPlusSign: Locator;
    readonly submitButton: Locator;
    readonly tableRows: Locator;

    constructor(page: Page) {
        super(page);
        this.leadsName = page.locator('input[name="name"]');
        this.leadsCompany = page.locator('input[name="company"]');
        this.leadsLeadSource = page.locator('input[name="leadSource"]');
        this.leadsIndustry = page.locator('input[name="industry"]');
        this.leadsPhone = page.locator('input[name="phone"]');
        this.leadsLeadStatus = page.locator('input[name="leadStatus"]');
        this.createLead = page.locator("//span[text()='Create Lead']");
        this.addCampaignPlusSign=page.locator('button:has(svg[data-icon="plus"])');
        this.submitButton = page.locator('button[type="submit"]');
        this.tableRows = page.locator('table.table-striped.table-hover tbody tr');
   
    }

    async formFill(leadsData: any,leadName:string) {
        
        await this.fill(this.leadsName,leadName );
        await this.fill(this.leadsCompany, leadsData.leadsCompany);
        await this.fill(this.leadsLeadSource,leadsData.leadsLeadSource);
        await this.type(this.leadsIndustry, leadsData.leadsIndustry);
        await this.type(this.leadsPhone, leadsData.leadsPhone);
        await this.type(this.leadsLeadStatus,leadsData.leadsLeadStatus);

    }

    async createLeads() {
      
        await this.click(this.createLead);
    }
    async addCampaign() {
      
        await this.click(this.addCampaignPlusSign);
    }
      //  Click submit button
      async clickSubmit() {
        await this.click(this.submitButton);
     
      //  await this.page.waitForNavigation();
    }

// Wait for table rows to be visible
async waitForTable() {
    await this.tableRows.first().waitFor({ state: 'visible' });
}

async validateLeadInTable(leadName: string) {
    // Locate all table rows
   // const tableRows = this.page.locator('table.table-striped.table-hover tbody tr');

    // Wait until at least one row is visible
   // await this.tableRows.first().waitFor({ state: 'visible' });

    // Check if the lead name exists in any row
    // Get all Lead Name cells (2nd <td>) from each row
    const leadNames = await this.tableRows.locator('td:nth-child(2)').allTextContents();

    // Check if the specific lead name exists
    if (!leadNames.includes(leadName)) {
        throw new Error(`Lead "${leadName}" not found in the table`);
    } else {
        console.log(`Lead "${leadName}" is successfully displayed in the table`);
    }
}

 /*async waitForLeadPage(){
    const tableRows = page.locator('table.table-striped.table-hover tbody tr');
await tableRows.first().waitFor({ state: 'visible' });
 }   */

   
}