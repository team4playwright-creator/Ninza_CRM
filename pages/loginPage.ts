import { basePage } from './basePage';
import { Page, Locator } from '@playwright/test';

export class loginPage extends basePage {
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameInput = page.locator('#username');
        this.passwordInput = page.locator('#inputPassword');
        this.loginButton = page.locator("//button[contains(text(),'Sign In')]");

   
    }

    async login(username: string, password: string) {
        await this.fill(this.usernameInput, username);
        await this.fill(this.passwordInput, password);
        await this.click(this.loginButton);
    }
}