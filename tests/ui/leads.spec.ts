//import { test, expect } from '@playwright/test';
//import { baseTest} from '../tests/baseTest';
//import { loginPage } from '../pages/loginPage';
//import testData from '../test-data/testdata.json';
//import { leadsPage } from '../pages/leadsPage';
//import{navigationPage} from '../pages/navigationPage';
//import{selectcampaignPage} from '../pages/selectCampaignPage';

import { test, expect } from '../../Fixtures/fixtures';
//import {  loginPage, leadsPage, navigationPage, selectcampaignPage, testData } from '../../pages/index';
import { selectcampaignPage } from '../../pages/selectCampaignPage';

const leadName = `Lead${Math.random().toString(36).replace(/[^a-zA-Z]/g, '').substring(0,5)}`;

test.describe('Lead Tests', () => {

test('Leads Page',async({navigationPage, loggedIn})=>{

  await navigationPage.clickLeads();
});


test('Create Leads',async({navigationPage, leadsPage, loggedIn})=>{

  await navigationPage.clickLeads();
  
  await leadsPage.createLeads();

});

test('Leads Form Fill',async({navigationPage, leadsPage, loggedIn,testData })=>{
  
  await navigationPage.clickLeads();
  await leadsPage.createLeads();
  await leadsPage.formFill(testData.leads,leadName);
});
  
test('Add Campaign',async({ navigationPage,leadsPage,page, loggedIn,testData})=>{

 
  await navigationPage.clickLeads();
  await leadsPage.createLeads();
  await leadsPage.formFill(testData.leads,leadName);

//switch to new page

const [campaignPopup] = await Promise.all([
  page.waitForEvent('popup'), 
  leadsPage.addCampaign()     
]);
  const selectCampaignPopup = new selectcampaignPage(campaignPopup);
  await selectCampaignPopup.expectSelectCampaignVisible();
  await selectCampaignPopup.selectSearchCriteria(testData.selectCampaign.searchcriteria);
await selectCampaignPopup.enterSearchValue(testData.selectCampaign.campaignId);
//await selectCampaignPopup.waitForTableDisplay(testData.selectCampaign.campaignId);
await selectCampaignPopup.selectCampaignFromTable(testData.selectCampaign.campaignId);

  // Drop down
   // Drop down
  /*await campaignPopup.selectOption('#search-criteria', testData.selectCampaign.searchcriteria);
  await campaignPopup.fill('#search-input', testData.selectCampaign.campaignId);
  await campaignPopup.waitForSelector(`td:has-text("${testData.selectCampaign.campaignId}")`, { timeout: 10000 });
  await campaignPopup.locator(`tr:has(td:has-text("${testData.selectCampaign.campaignId}")) button.select-btn`).click();*/




  await Promise.all([
    page.waitForNavigation(),
    leadsPage.clickSubmit()
   // page.locator('button[type="submit"]').click()
  ]);

  //await selectcampaignpage.clickSubmit();
 await leadsPage.waitForTable();
 await leadsPage.validateLeadInTable(leadName);
});




    
  
  


  /*

 


  await campaignPage.selectOption('#search-criteria', 'campaignId');
  await campaignPage.fill('#search-input', 'CAM00001'); 
  await campaignPage.waitForSelector('td:has-text("CAM00001")');

  await campaignPage.locator('tr:has(td:has-text("CAM00001")) button.select-btn').click();

/*
  await Promise.all([
    page.waitForNavigation(),
    page.locator('button[type="submit"]').click()
  ]);
  


const tableRows = page.locator('table.table-striped.table-hover tbody tr');
await tableRows.first().waitFor({ state: 'visible' });
  await page.screenshot({ path: 'screenshots/leads-page.png', fullPage: true });

});

*/

});