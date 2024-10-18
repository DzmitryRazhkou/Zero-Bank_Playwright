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

  async interceptGraphqlCallApproach() {
    // const processedRequests = new Map();
    // await page.route("**/graphql", async (route) => {
    //   const request = route.request();
    //   const postData = request.postDataJSON();
    //   // Check if the request payload contains the query name "sendOrderImpressionQuery"
    //   if (postData?.queryName === "calculateCart") {
    //     console.log(" >>>>> Intercepted Request Is: <<<<< ", postData);
    //   }
    //   // Continue with the original request
    //   await route.continue();
    //   // Define a handler for the response
    //   const handleResponse = async (response) => {
    //     const requestId = response.request().postData(); // Unique identifier for the request
    //     // Check if the response URL matches your GraphQL endpoint and if it corresponds to the intercepted request
    //     if (
    //       response.url().includes("/graphql") &&
    //       postData?.queryName === "calculateCart" &&
    //       !processedRequests.has(requestId) // Only process if it hasn't been processed yet
    //     ) {
    //       processedRequests.set(requestId, true); // Mark this request as processed
    //       const responseBody = await response.json(); // Get the response body as JSON
    //       console.log(" >>>>> Intercepted Response Is: <<<<< ", responseBody);
    //       // Assertion: Check if the response body has the property sendOrderImpression
    //       expect(responseBody.data).toHaveProperty("calculateCart");
    //       // Optionally check the value if needed
    //       // expect(responseBody.data.sendOrderImpression).toEqual(90);
    //       // Remove the response listener to prevent further logs
    //       page.off("response", handleResponse);
    //     }
    //   };
    //   // Listen for the response
    //   page.on("response", handleResponse);
    // });
  }

  async interceptSendOrderImpressionGraphqlCall() {
    await this.page.route("**/graphql", async (route) => {
      const request = route.request();
      const postData = request.postDataJSON();

      if (postData && postData.queryName === "sendOrderImpressionQuery") {
        console.log(" >>>>> Intercepted Request Is: <<<<< ", postData);
      }

      // Continue with the original request
      await route.continue();

      // Listen for the response to the GraphQL request
      this.page.on("response", async (response) => {
        // Check if the response URL matches your GraphQL endpoint:

        if (
          response.url().includes("/graphql") &&
          response.request().postDataJSON()?.queryName ===
            "sendOrderImpressionQuery"
        ) {
          const responseBody = await response.json(); // Get the response body as JSON

          console.log(" >>>>> Intercepted Response Is: <<<<< ", responseBody);

          // sendOrderImpressionV2:
          expect(responseBody.data).toBeInstanceOf(Object);
          expect(responseBody.data).toHaveProperty("sendOrderImpressionV2");
        }
      });
    });
  }

  async interceptCalculateCartGraphqlCall() {
    await this.page.route("**/graphql", async (route) => {
      const request = route.request();
      const postData = request.postDataJSON();

      if (postData && postData.queryName === "calculateCart") {
        console.log(" >>>>> Intercepted Request Is: <<<<< ", postData);
      }

      // Continue with the original request
      await route.continue();

      // Listen for the response to the GraphQL request
      this.page.on("response", async (response) => {
        // Check if the response URL matches your GraphQL endpoint:

        if (
          response.url().includes("/graphql") &&
          response.request().postDataJSON()?.queryName === "calculateCart"
        ) {
          const responseBody = await response.json(); // Get the response body as JSON

          console.log(" >>>>> Intercepted Response Is: <<<<< ", responseBody);

          // calculateCart:
          expect(responseBody.data).toHaveProperty("calculateCart");
          expect(responseBody.data.calculateCart).toBeInstanceOf(Object);

          // lineItems:
          expect(responseBody.data.calculateCart).toHaveProperty("lineItems");
          expect(responseBody.data.calculateCart.lineItems).toBeInstanceOf(
            Array
          );

          // duplicate:
          expect(responseBody.data.calculateCart).toHaveProperty("duplicate");
          expect(typeof responseBody.data.calculateCart.duplicate).toBe(
            "boolean"
          );
          expect(responseBody.data.calculateCart.duplicate).toEqual(false);

          // shippingAmount:
          expect(responseBody.data.calculateCart).toHaveProperty(
            "shippingAmount"
          );
          expect(typeof responseBody.data.calculateCart.shippingAmount).toBe(
            "string"
          );

          // subtotal:
          expect(responseBody.data.calculateCart).toHaveProperty("subtotal");
          expect(typeof responseBody.data.calculateCart.subtotal).toBe(
            "string"
          );

          // discountTotal:
          expect(responseBody.data.calculateCart).toHaveProperty(
            "discountTotal"
          );
          expect(responseBody.data.calculateCart.discountTotal).toEqual(null);

          // discountRate:
          expect(responseBody.data.calculateCart).toHaveProperty(
            "discountRate"
          );
          expect(responseBody.data.calculateCart.discountRate).toEqual(null);

          // total:
          expect(responseBody.data.calculateCart).toHaveProperty("total");
          expect(typeof responseBody.data.calculateCart.total).toBe("string");

          // tax:
          expect(responseBody.data.calculateCart).toHaveProperty("tax");
          expect(typeof responseBody.data.calculateCart.tax).toBe("string");

          // softDescriptor:
          expect(responseBody.data.calculateCart).toHaveProperty(
            "softDescriptor"
          );
          expect(typeof responseBody.data.calculateCart.softDescriptor).toBe(
            "string"
          );
          expect(responseBody.data.calculateCart.softDescriptor).toEqual(
            "CLKBANK*FleaTickCollar"
          );

          // availableItems:
          expect(responseBody.data.calculateCart).toHaveProperty(
            "availableItems"
          );
          expect(responseBody.data.calculateCart.availableItems).toBeInstanceOf(
            Array
          );
        }
      });
    });
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
    // await this.page.waitForLoadState("networkidle");

    // Get the current URL after navigation
    let currentURL = this.page.url();

    // Replace 'orders' or 'orders2' with 'orders2' in the URL
    currentURL = currentURL.replace(/orders(?:2)?/, "orders2");
    await this.page.goto(currentURL, { timeout: 100000 });
    await this.page.waitForLoadState("networkidle");

    // Verify if the current URL contains vendor, domain, and sku
    if (
      !currentURL.includes(vendor) ||
      !currentURL.includes(domain) ||
      !currentURL.includes(sku)
    ) {
      throw new Error(
        `The current URL does not contain the expected vendor, domain, or sku. Expected URL: ${url}, Modified URL: ${currentURL}`
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
