import { expect, test } from "@playwright/test";
const { sofGeneratedData } = require("../utils/generated-data");
const dataSet = require("../fixtures/common.json");
import SofCheckoutPage from "../pages/SofCheckoutPage";
const vendor = dataSet.sofv2.vendor;
const domain = dataSet.sofv2.domain;
const sku = dataSet.sofv2.sku;
const cntry = dataSet.sofv2.cntryUS;
let zipCode;
let sofCheckoutPage;
let page;
let context;

test.describe("SOF V2 | Intercepting & Verification GraphQL Calls 🏠 📄", () => {
  let context;
  let page;
  let sofCheckoutPage;
  let zipCode;

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
  });

  test.beforeEach(async () => {
    page = await context.newPage();
    sofCheckoutPage = new SofCheckoutPage(page);
    zipCode = await sofCheckoutPage.generateRandomElement(dataSet.usZipcodes);

    await sofCheckoutPage.interceptCalculateCartGraphqlCall();
    await sofCheckoutPage.navigateToSOFv2URL(
      vendor,
      domain,
      sku,
      cntry,
      zipCode
    );
  });

  test.afterEach(async () => {
    await page.close();
  });

  test.afterAll(async () => {
    await context.close();
  });

  test("Verify 'Start Page' Title & URL 📝 🔗", async () => {
    const { email } = dataSet.credentials;
    const phone = await sofCheckoutPage.generateRandomElement(
      dataSet.usPhoneNumber
    );
    const { creditCardNumber, expiryDate, cvc } = dataSet.creditCard;
    const { fullName, addressFirstLine, addressSecondLine } = sofGeneratedData;

    await sofCheckoutPage.doFillUpSOF(
      email,
      phone,
      creditCardNumber,
      expiryDate,
      cvc,
      fullName,
      addressFirstLine,
      addressSecondLine
    );
    await sofCheckoutPage.verifyBillingInfoFullNameAndEmail(fullName, email);
  });

  test.only("SOF v2 Intercept Calls 📝 🔗", async () => {
    console.log(" =====> GRAPHQL CALL INTERCEPTED!!! <===== ");
  });
});
