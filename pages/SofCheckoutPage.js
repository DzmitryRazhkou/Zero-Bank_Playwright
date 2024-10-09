import { expect } from "@playwright/test";
import { log } from "console";
import BasePage from "./BasePage";
const { sofCheckoutPageLocators } = require("../locators/locators").default;

class SofCheckoutPage extends BasePage {
  constructor(page) {
    super(page);
    this.emailInputField = page.locator(
      sofCheckoutPageLocators.emailInputFieldLocator
    );
    this.phoneInputField = page.locator(
      sofCheckoutPageLocators.phoneInputFieldLocator
    );
    this.cardNumberInputField = page
      .frameLocator(sofCheckoutPageLocators.iframeCardNumberFieldInputLocator)
      .locator(sofCheckoutPageLocators.cardNumberFieldInputLocator);
    this.expirationDateInputField = page.locator(
      sofCheckoutPageLocators.expirationDateInputFieldLocator
    );
    this.securityCodeInputField = page.locator(
      sofCheckoutPageLocators.securityCodeInputFieldLocator
    );
    this.cardHolderNameInputField = page.locator(
      sofCheckoutPageLocators.cardHolderNameInputFieldLocator
    );
    this.billingFullNameInputField = page.locator(
      sofCheckoutPageLocators.billingFullNameInputFieldLocator
    );
    this.billingAddressLineFirstInputField = page.locator(
      sofCheckoutPageLocators.billingAddressLineFirstInputFieldLocator
    );
    this.billingAddressLineSecondInputField = page.locator(
      sofCheckoutPageLocators.billingAddressLineSecondInputFieldLocator
    );
    this.payNowButton = page.locator(
      sofCheckoutPageLocators.payNowButtonLocator
    );
    this.billingInfoFullName = page.locator(
      sofCheckoutPageLocators.billingInfoFullNameLocator
    );
    this.billingInfoEmail = page.locator(
      sofCheckoutPageLocators.billingInfoEmailLocator
    );
  }

  async navigateToSOFv2URL(
    vendor,
    domain,
    sku,
    country,
    zipCode,
    timeout = 30000
  ) {
    const url = `https://${vendor}.pay.${domain}/?cbitems=${sku}&country=${country}&zipcode=${zipCode}`;
    await this.page.goto(url, { timeout: 100000 });
    await this.page.waitForLoadState("networkidle");

    // Get the current URL after navigation
    const currentURL = this.page.url();

    // Verify if the current URL contains vendor, domain, and sku
    if (
      !currentURL.includes(vendor) ||
      !currentURL.includes(domain) ||
      !currentURL.includes(sku)
    ) {
      throw new Error(
        `The current URL does not contain the expected vendor, domain, or sku. Expected URL: ${url}, Actual URL: ${currentURL}`
      );
    }
    console.log(`Navigation successful and verified: ${currentURL}`);
  }

  async verifyBillingInfoFullNameAndEmail(fullName, email) {
    const fullNameTxtContent = await this.billingInfoFullName.textContent();
    const emailTxtContent = await this.billingInfoEmail.textContent();

    expect(fullNameTxtContent).toEqual(fullName);
    expect(emailTxtContent).toEqual(email);
  }

  async doFillUpSOF(
    email,
    phone,
    cardNumber,
    expDate,
    CVV,
    fullName,
    addressLineFirst,
    addressSeconfLine
  ) {
    // Customer Info:
    await this.emailInputField.fill(email);
    await this.phoneInputField.fill(phone);

    // Payment Info:
    await this.cardNumberInputField.fill(cardNumber);
    await this.expirationDateInputField.fill(expDate);
    await this.securityCodeInputField.fill(CVV);
    await this.cardHolderNameInputField.fill(fullName);

    // Shipping Info:
    await this.billingFullNameInputField.fill(fullName);
    await this.billingAddressLineFirstInputField.fill(addressLineFirst);
    await this.billingAddressLineSecondInputField.fill(addressSeconfLine);

    // Pay Now:
    await this.payNowButton.click();
    await this.page.waitForLoadState("networkidle");
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

export default SofCheckoutPage;
