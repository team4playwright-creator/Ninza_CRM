//import { test, expect } from '@playwright/test';
//import { getAPIContext } from '../../utils/apiClient';
//import { UserAPI } from '../../api/UserApi';
//import { CampaignAPI } from '../../api/CampaignAPI';
//import { test, expect, UserAPI, CampaignAPI, getAPIContext } from '../apifixtures';

import { test, expect } from '../../Fixtures/apifixtures';
import { campaignData } from '../../test-data/campaignData';



let token: string;
let createCampaignId :string;

test.describe('Ninza CRM API Tests', () => {

  test('Login API', async ({ loginResponse }) => {

    expect(loginResponse.response.status()).toBe(202);
    expect(loginResponse.token).toBeDefined();
  
  });
  
  test('Get Campaigns API', async ({ campaignAPI }) => {

    const response = await campaignAPI.getCampaigns("1", "10");
    const body = await response.json();

    expect(response.status()).toBe(200);

    /*const campaign = body.content.find(
      (item: { campaignId: string }) => item.campaignId === "CAM10058"
    );

    expect(campaign).toBeDefined();*/
  });
    
  
  test('Create Campaign API', async ({ campaignAPI }) => {

    /*const data = {
      campaignName: "Camp_005",
      campaignStatus: "Active",
      targetSize: 10,
      expectedCloseDate: "2026-03-31",
      targetAudience: "abc",
      description: "Test Description"
    };*/
  
    //const response = await campaignAPI.createCampaign(data);
    const response = await campaignAPI.createCampaign(campaignData.validCampaign);
    
    const body = await response.json();
    createCampaignId = body.campaignId;
    console.log(createCampaignId);
    expect(response.status()).toBe(201);
  
    expect(body.campaignName).toBe(campaignData.validCampaign.campaignName);
    expect(body.campaignStatus).toBe(campaignData.validCampaign.campaignStatus);
    expect(body.targetAudience).toBe(campaignData.validCampaign.targetAudience);
  
  });

   
  
    test('Edit Campaign API', async ({ campaignAPI }) => {

     /* const campaignData = {
        campaignId: "CAM10119",
        campaignName: "FreshCampaign_1773358992",
        campaignStatus: "pass",
        createdAt: "2026-03-13T05:13:10",
        description: "desc",
        expectedCloseDate: "2026-03-15",
        targetAudience: "IT users",
        targetSize: 40
      };*/
  
      const response = await campaignAPI.editCampaign(campaignData.editCampaign,createCampaignId);
  
      expect(response.status()).toBe(200);
    });
  
    test('Delete Campaign API', async ({ campaignAPI }) => {

      //const response = await campaignAPI.deleteCampaign(campaignData.deleteCampaign.campaignId);
      const response = await campaignAPI.deleteCampaign( createCampaignId);
      
  
      expect(response.status()).toBe(204);
    });

    test('Patch Invoice API', async ({ invoiceAPI }) => {

      const invoiceId = campaignData.patchInvoice.invoiceId;
      const status = campaignData.patchInvoice.status;;
       const response = await invoiceAPI.patchInvoice(invoiceId,status);
   
       expect(response.status()).toBe(200);
     });
  
  });