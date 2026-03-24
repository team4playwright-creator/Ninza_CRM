import { basePage } from './basePage';
import { Page, Locator } from '@playwright/test';

export class navigationPage extends basePage {
    readonly campaign: Locator;
    readonly leads: Locator;
   

    constructor(page: Page) {
        super(page);
        this.campaign = page.locator("//a[text()='Campaigns']");
        this.leads = page.locator("//a[text()='Leads']");
        
      
    }
   
    

    async clickCampaign() {
      
        await this.click(this.campaign);
    }
    async clickLeads() {
      
        await this.click(this.leads);
    }

   

   
}