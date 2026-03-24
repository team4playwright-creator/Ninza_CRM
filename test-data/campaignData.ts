export const campaignData = {
    validCampaign: {
      campaignName: `Camp_${Date.now()}`,
      campaignStatus: "Active",
      targetSize: 10,
      expectedCloseDate: "2026-03-31",
      targetAudience: "abc",
      description: "Test Description"
    },
    editCampaign:{
        
        campaignName: `Updated_${Date.now()}`,
        campaignStatus: "Active",
        createdAt: "2026-03-13T05:13:10",
        description: "desc",
        expectedCloseDate: "2026-03-15",
        targetAudience: "IT users",
        targetSize: 40
    },
    deleteCampaign:{
        campaignId: "CAM10687",
    },
    patchInvoice:{
       invoiceId : "INVOICE_00724",
      status :"Active"

    }
    
  };