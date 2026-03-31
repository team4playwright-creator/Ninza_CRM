import { basePage } from './basePage';
import { Page, Locator } from '@playwright/test';
import { leadsPage } from './leadsPage';
import { selectLeadPage } from './selectLeadPage';


export class opportunityPage extends basePage {
    readonly newOpportunityBtn: Locator;
    readonly nameInput: Locator;
    readonly amountInput: Locator;
    readonly businessTypeInput: Locator;
    readonly nextStepInput: Locator;
    readonly salesStageInput: Locator;
    readonly leadPlusBtn: Locator;
    readonly createBtn: Locator;
    readonly tableRows: Locator;

    constructor(page: Page) {
        super(page);

        this.newOpportunityBtn = page.locator('text=Create Opportunity');
        this.nameInput = page.locator('input[name="opportunityName"]');
        this.amountInput = page.locator('input[name="amount"]');
        this.businessTypeInput = page.locator('input[name="businessType"]');
        this.nextStepInput = page.locator('input[name="nextStep"]');
        this.salesStageInput = page.locator('input[name="salesStage"]');
        this.leadPlusBtn = page.locator('button:has(svg[data-icon="plus"])');
        this.createBtn = page.locator('button:has-text("Create Opportunity")');

        this.tableRows = page.locator('table tbody tr');
    }

    async clickNewOpportunity() {
        await this.click(this.newOpportunityBtn);
    }

    async fillOpportunityForm(data: any) {
        await this.fill(this.nameInput, data.name);
        await this.fill(this.amountInput, data.amount);
        await this.fill(this.businessTypeInput, data.businessType);
        await this.fill(this.nextStepInput, data.nextStep);
        await this.fill(this.salesStageInput, data.salesStage);
    }

    async clickLeadPlus() {
        await this.click(this.leadPlusBtn);
    }

    async clickCreateOpportunity() {
        await this.click(this.createBtn);
    }

    // 🔥 COMPLETE FLOW
    async createOpportunityWithLead(data: any, leadName: string, context: any) {

        await this.clickNewOpportunity();
        await this.fillOpportunityForm(data);

        // Handle new tab
        const [leadPageInstance] = await Promise.all([
            context.waitForEvent('page', { timeout: 60000 }),
            this.clickLeadPlus()
        ]);

        await leadPageInstance.waitForLoadState('domcontentloaded');
        await leadPageInstance.locator('#lead-table tbody tr').first().waitFor({ timeout: 60000 });

        const leadObj = new selectLeadPage(leadPageInstance);
        //await leadObj.waitForTable();             // ensure table is visible
        await leadObj.selectLeadFromTable(leadName); // select the lead
        

        // Switch back to main page
        await this.page.bringToFront();

        await this.clickCreateOpportunity();
    }
    async validateOpportunity(name: string) {

        //this.tableRows = this.page.locator('#lead-table tbody tr');
        //await this.tableRows.first().waitFor({ state: 'visible', timeout: 60000 });
    // wait for table
    //await this.page.locator('#lead-table').waitFor({ state: 'visible', timeout: 60000 });

    // now get rows
    const rows = this.page.locator('#lead-table tbody tr');

    // wait until at least 1 row is visible
    //await rows.first().waitFor({ state: 'visible', timeout: 60000 });

    // get all names from second column
    const names = await rows.locator('td:nth-child(2)').allTextContents();

    if (!names.includes(name)) {
        throw new Error(`Opportunity "${name}" not found in table`);
    }
    else {
            console.log(`Opportunity "${name}" created successfully`);
        }
    }
}