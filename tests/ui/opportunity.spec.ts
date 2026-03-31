import { test, expect } from '../../Fixtures/fixtures'; // ✅ must use your fixture import

test.describe('Opportunity Tests', () => {

  // Test Case: Create Opportunity with Lead
  test('Create Opportunity with Lead', async ({
    navigationPage,
    opportunityPage,
    testData,
    page,
    loggedIn, // ensures user is already logged in
  }) => {

    // Navigate to Opportunities page
    await navigationPage.clickOpportunities();

    // Cast testData to safely access opportunity and lead
    const data = (testData as unknown as { opportunity: any; leads: { leadsName: string } }).opportunity;
    const leadName = (testData as unknown as { opportunity: any; leads: { leadsName: string } }).leads.leadsName;

    await opportunityPage.createOpportunityWithLead(
        data,
        'Lead_22285',
        page.context()
    );
   
    // Validate that the opportunity was created successfully
    //await opportunityPage.validateOpportunity(data.name);
  });

});