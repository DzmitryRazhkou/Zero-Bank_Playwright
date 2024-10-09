import { test } from "@playwright/test";
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

test.describe(`SOF V2 | Intercepting & Verification GraphQL Calls 🏠 📄. `, () => {
  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
  });

  test.beforeEach(async () => {
    page = await context.newPage();
    sofCheckoutPage = new SofCheckoutPage(page);
    zipCode = await sofCheckoutPage.generateRandomElement(dataSet.usZipcodes);
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

  test(" =====> Verify 'Start Page' Title & URL 📝 🔗 <===== ", async () => {
    const email = dataSet.credentials.email;
    const phone = await sofCheckoutPage.generateRandomElement(
      dataSet.usPhoneNumber
    );
    const cardNumber = dataSet.creditCard.creditCardNumber;
    const expiryDate = dataSet.creditCard.expiryDate;
    const cvc = dataSet.creditCard.cvc;
    const fullName = sofGeneratedData.fullName;
    const addressFirstLine = sofGeneratedData.addressFirstLine;
    const addressSecondLine = sofGeneratedData.addressSecondLine;

    await sofCheckoutPage.doFillUpSOF(
      email,
      phone,
      cardNumber,
      expiryDate,
      cvc,
      fullName,
      addressFirstLine,
      addressSecondLine
    );
    await sofCheckoutPage.verifyBillingInfoFullNameAndEmail(fullName, email);
  });
});
