// import testData from '../../testdata/config.json';
// import {test} from '../../fixtures/crmUI.fixture';
import { test, expect } from '../../Fixtures/fixtures';


test.describe('Campaign Tests', () => {

//Test Case 1
test('Create Campaign Successfully', async ({navigationPage,loggedIn, campaignPage,campaignConfig }) => {
    
    await navigationPage.clickCampaign();

    const randomStr = Math.random().toString(36).replace(/[^a-z]/g, '').substring(0, 6);
    const name=`${campaignConfig.campaignName}${randomStr}`;
   
    await campaignPage.createcampaign(name, campaignConfig.targetSize);
    //Validation
    await campaignPage.validateCreateCampaign(name);

});

//Test Case 2
test('Search Campaign using Id', async ({navigationPage,loggedIn, campaignPage,campaignConfig }) => {
      
    await navigationPage.clickCampaign();

    //search campaign
    await campaignPage.searchcampaign(campaignConfig.campaignId);

    //Validation
    await campaignPage.validateSearchCampaign(campaignConfig.campaignId);
     
});

//Test Case 3
test("Test Tool Tip",async({navigationPage,loggedIn, campaignPage,campaignConfig}) => {
    
    await navigationPage.clickCampaign();
    //search campaign
    await campaignPage.searchcampaign(campaignConfig.campaignId);

    //Validation
    await campaignPage.validateSearchCampaign(campaignConfig.campaignId);

    //ToolTip Verification
    await campaignPage.tooltipVerification();
    
});

});