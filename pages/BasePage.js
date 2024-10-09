import { expect } from "@playwright/test";
import { log } from "console";
class BasePage {
  constructor(page) {
    this.page = page;
  }
  async navigateToURL() {
    await this.page.goto("./index.html");
  }

  async verifyURL() {
    await expect(this.page).toHaveURL("./index.html");
  }

  async verifyTitlePage(pageTitle) {
    await expect(this.page).toHaveTitle(pageTitle);
    console.log(" =====> " + pageTitle + " <===== ");
  }

  async clickOnWebElement(selector, timeout = 5000) {
    try {
      // Create a promise that rejects after the specified timeout
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(
          () =>
            reject(
              new Error(`Timeout: Failed to click element within ${timeout}ms`)
            ),
          timeout
        )
      );

      const clickPromise = this.page.click(selector);
      await Promise.race([clickPromise, timeoutPromise]);
    } catch (error) {
      console.error(error.message);
    }
  }

  async fill(selector, value) {
    await this.page.fill(selector, value);
  }

  async getText(selector) {
    return this.page.textContent(selector);
  }

  async isVisible(selector) {
    return this.page.isVisible(selector);
  }

  async waitForWebElement(selector, state = "visible") {
    const element = this.page.locator(selector);
    await element.waitFor({ state });
  }

  async generateEmailAddress(fullName) {
    const emailProvider = [
      "@yahoo.com",
      "@gmail.com",
      "@outlook.com",
      "@icloud.com",
      "@protonmail.com",
      "@aol.com",
    ];

    const randomIndex = Math.floor(Math.random() * emailProvider.length);
    const emailAddress = fullName.toLowerCase().replace(/\s+/g, "");
    return emailAddress + emailProvider[randomIndex];
  }

  async generateRandomElement(array) {
    const randonIndex = Math.floor(Math.random() * array.length);
    return array[randonIndex];
  }
}

export default BasePage;
