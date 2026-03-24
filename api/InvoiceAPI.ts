export class InvoiceAPI {
    constructor(private apiContext) {}
  
    // PATCH INVOICE
    async patchInvoice(invoiceId: string, status: string) {
      const response = await this.apiContext.patch(`/invoice/${invoiceId}/${status}`);
      return response;
    }
  }