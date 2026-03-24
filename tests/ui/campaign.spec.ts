//import { test, expect } from '@playwright/test';
//import { baseTest} from '../tests/baseTest';
//import { loginPage } from '../pages/loginPage';
//import testData from '../test-data/testdata.json';
//import { campaignPage } from '../pages/campaignPage';
//import{navigationPage} from '../pages/navigationPage';

import { test, expect } from '../../Fixtures/fixtures';
//import {  loginPage, leadsPage, campaignPage, navigationPage, selectcampaignPage, testData } from '../../pages';




test.describe('Campaign Tests', () => {




test('Campaign Page',async({navigationPage,loggedIn})=>{
 
  await navigationPage.clickCampaign();
});


test('Create Campaign',async({navigationPage,loggedIn, campaignPage,testData})=>{
 
  const campaignName = `Campaign${Math.random().toString(36).replace(/[^a-zA-Z]/g, '').substring(0,5)}`;
  await navigationPage.clickCampaign();

  await campaignPage.createCampaignPage();
  await campaignPage.formFill(testData.campaign,campaignName);
  await campaignPage.clickSubmit();
  //await campaignPage.selectDate("2026-03-10");
  await campaignPage.waitForTable();
  await campaignPage.validateLeadInTable(campaignName);

});



})