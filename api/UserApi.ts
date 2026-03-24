export class UserAPI {

    constructor(private apiContext) {}
  
    async login() {
      const response = await this.apiContext.get('/login');
      const body = await response.json();

    const token = body.jwtToken;

    return {
      response,
      token
    };

  }
}