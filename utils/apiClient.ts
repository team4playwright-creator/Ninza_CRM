import { request } from '@playwright/test';
import { testData } from '../pages'; // barrel file import

export async function getAPIContext() {
   // const username = testData.validUser.username;
    //const password = testData.validUser.password;

    const username = process.env.USERNAME!;
    const password = process.env.PASSWORD!;
  const apiContext = await request.newContext({
    //baseURL: 'http://49.249.28.218:8098',
    baseURL: process.env.BASE_URL,
    extraHTTPHeaders: {
        "Authorization": "Basic " + Buffer.from(`${username}:${password}`).toString("base64"),
        "Content-Type": "application/json"
    }
  });

  return apiContext;
} 