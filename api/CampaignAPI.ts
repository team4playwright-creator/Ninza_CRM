export class CampaignAPI {

    constructor(private apiContext) {}
  
    // GET Campaigns
    async getCampaigns(page: string, size: string) {
      const response = await this.apiContext.get('/campaign/all', {
        params: {
          page,
          size
        }
      });
      return response;
    }
  

    // CREATE Campaign
    async createCampaign(data:any) {
      const response = await this.apiContext.post('/campaign', {
        data
      });
      return response;
    }
  
    // EDIT Campaign
    async editCampaign(data:any,createCampaignId: string) {
  
      const response = await this.apiContext.put('/campaign', {
        params: {
          campaignId: createCampaignId
        },
        data: {
          campaignId:createCampaignId,
          data
        }
      });
  
      return response;
    }
  
    // DELETE Campaign
    async deleteCampaign(createCampaignId: string) {
  
      const response = await this.apiContext.delete('/campaign', {
        params: {
          campaignId:createCampaignId
        }
      });
  
      return response;
    }
  
  }