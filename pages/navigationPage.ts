import { basePage } from './basePage';
import { Page, Locator } from '@playwright/test';

export class navigationPage extends basePage {
    readonly campaign: Locator;
    readonly leads: Locator;
    readonly contactsTab: Locator;
    readonly opportunitiesTab: Locator;

    constructor(page: Page) {
        super(page);
        this.campaign = page.locator("//a[text()='Campaigns']");
        this.leads = page.locator("//a[text()='Leads']");
        this.contactsTab = this.page.getByRole('link', { name: 'Contacts' });
        this.opportunitiesTab = page.locator('a.nav-link[href="/opportunities"]'); //added
       
 }

    async clickCampaign() {
      
        await this.click(this.campaign);
    }
    async clickLeads() {
      
        await this.click(this.leads);
    }

    async clickContactsLink() {

      await this.contactsTab.click();
  }
//added
   async clickOpportunities() {
        await this.click(this.opportunitiesTab);
    }
}
