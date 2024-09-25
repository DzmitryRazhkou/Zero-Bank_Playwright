import { test } from "@playwright/test";
const { startPageLocators, loginPageLocators, onlineBankingPageLocators } =
  require("../locators/locators").default;
const { feedBackData } = require("../utils/generated-data");
const dataSet = require("../fixtures/common.json");
import StartPage from "../pages/StartPage";
import LoginPage from "../pages/LoginPage";
import OnlineBankingPage from "../pages/OnlineBankingPage";

let startPage;
let loginPage;
let onlineBankingPage;
let page;
let context;

test.describe.only(`Online Banking Tests 💻 🏦 💳 📱. `, () => {
  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
  });

  test.beforeEach(async () => {
    page = await context.newPage();
    loginPage = new LoginPage(page);
    startPage = new StartPage(page);
    onlineBankingPage = new OnlineBankingPage(page);

    const userName = dataSet.loginCredentials.userName;
    const password = dataSet.loginCredentials.psw;
    const pageTitle = dataSet.mainPage.pageTitle;
    const onlineBankPage =
      dataSet.mainPage.pageNavigationSection.onlineBankingPage;

    await startPage.navigateToURL();
    await startPage.clickOnWebElement(startPageLocators.signInButtonLocator);
    await loginPage.waitForWebElement(
      loginPageLocators.loginInToZeroBankHeaderLocator
    );
    await loginPage.doLogin(userName, password);
    await page.goBack();
    await startPage.verifyURL();
    await startPage.verifyTitlePage(pageTitle);
    await startPage.clickOnPageNavigation(onlineBankPage);

    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  });

  test.afterEach(async () => {
    // Clear cookies and cache after each test
    await context.clearCookies();
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });

    await page.close();
  });

  test.afterAll(async () => {
    await context.close();
  });

  test(" =====> Online Banking Tests | 'Account Summary' 📈 📋 💰 <===== ", async () => {
    const accountSummary =
      dataSet.mainPage.pageNavigationContent.onlineBankingActivites
        .accountSummary;
    const accountsTitles = dataSet.onlineBanking.accountSummary.accountsTitles;
    const balance = dataSet.onlineBanking.accountSummary.balance;

    await startPage.waitForWebElement(
      startPageLocators.ourBankIsTrustedHeaderLocator
    );
    await startPage.clickOnOnlineBankingActivity(accountSummary);
    await onlineBankingPage.verifyAccountsTitles(accountsTitles);
    await onlineBankingPage.verifyBalance(balance);
  });
  test(" =====> Online Banking Tests | 'Account Activity' | Show Transactions 💳 📜 🔍 <===== ", async () => {
    const accountActivity =
      dataSet.mainPage.pageNavigationContent.onlineBankingActivites
        .accountActivity;
    const account = await onlineBankingPage.genarateRandomElement(
      dataSet.onlineBanking.accountArray
    );

    await startPage.waitForWebElement(
      startPageLocators.ourBankIsTrustedHeaderLocator
    );
    await startPage.clickOnOnlineBankingActivity(accountActivity);
    await onlineBankingPage.selectActivityFromDropDown(account);
  });
  test(" =====> Online Banking Tests | 'Account Activity' | Find Transactions 💳 📊 🔍 <===== ", async () => {
    const accountActivity =
      dataSet.mainPage.pageNavigationContent.onlineBankingActivites
        .accountActivity;
    const account = await onlineBankingPage.genarateRandomElement(
      dataSet.onlineBanking.accountArray
    );
    const description = dataSet.onlineBanking.trans.description;
    const date = dataSet.onlineBanking.trans.date;
    const amount = dataSet.onlineBanking.trans.amount;

    await startPage.waitForWebElement(
      startPageLocators.ourBankIsTrustedHeaderLocator
    );
    await startPage.clickOnOnlineBankingActivity(accountActivity);
    await onlineBankingPage.selectActivityFromDropDown(account);
    await onlineBankingPage.clickOnWebElement(
      onlineBankingPageLocators.findTransactionsButtonLocator
    );

    await onlineBankingPage.doFindTransaction(description, date, amount);
    await onlineBankingPage.verifyNoResults();
  });
  test(" =====> Online Banking Tests | 'Account Activity' | Transfer Funds 💸 ➡️ 💳 <===== ", async () => {
    const transferFunds =
      dataSet.mainPage.pageNavigationContent.onlineBankingActivites
        .transferFunds;
    const fromAccount =
      dataSet.onlineBanking.transferMoneyMakePayments.valueOne;
    const toAccount = dataSet.onlineBanking.transferMoneyMakePayments.valueTwo;
    const amount = dataSet.onlineBanking.transferMoneyMakePayments.amount;
    const description = feedBackData.descriptionTransfer;
    const transferMoneyMakePaymentsVerifyTxt =
      dataSet.onlineBanking.transferMoneyMakePayments
        .transferMoneyMakePaymentsVerifyTxt;
    const successMsgTxt =
      dataSet.onlineBanking.transferMoneyMakePayments.successMsg;

    await startPage.waitForWebElement(
      startPageLocators.ourBankIsTrustedHeaderLocator
    );
    await startPage.clickOnOnlineBankingActivity(transferFunds);
    await onlineBankingPage.doTransferMoneyMakePayments(
      fromAccount,
      toAccount,
      amount,
      description
    );
    await onlineBankingPage.verifyTransferMoneyHeaderTxt(
      transferMoneyMakePaymentsVerifyTxt
    );
    await onlineBankingPage.clickOnWebElement(
      onlineBankingPageLocators.continueButtonLocator
    );
    await onlineBankingPage.verifyAlertSuccessMsgTxt(successMsgTxt);
  });
});

test.describe(`Start Page Tests 🏠 📄. `, () => {
  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
  });

  test.beforeEach(async () => {
    page = await context.newPage();
    startPage = new StartPage(page);
    loginPage = new LoginPage(page);
    await startPage.navigateToURL();
  });

  test.afterEach(async () => {
    await page.close();
  });

  test.afterAll(async () => {
    await context.close();
  });

  test(" =====> Verify 'Start Page' Title & URL 📝 🔗 <===== ", async () => {
    const pageTitle = dataSet.mainPage.pageTitle;

    await startPage.verifyURL();
    await startPage.verifyTitlePage(pageTitle);
  });
  test(" =====> Verify 'Page Navigation' & Home Page Content 🏠 ▶️	➡️ ⏩ 👉 <===== ", async () => {
    const listOfPageNavigation = dataSet.mainPage.listOfPageNavigation;
    const homePage = dataSet.mainPage.pageNavigationSection.homePage;
    const homeContent = dataSet.mainPage.pageNavigationContent.homeContent;

    await startPage.verifyPageNavigation(listOfPageNavigation);
    await startPage.clickOnPageNavigation(homePage);
    await startPage.verifyHomePageContent(homeContent);
  });
  test(" =====> Verify 'Page Navigation' & Online Banking Page Content 🏠 ▶️	➡️ ⏩ 👉 <===== ", async () => {
    const listOfPageNavigation = dataSet.mainPage.listOfPageNavigation;
    const onlineBankingPage =
      dataSet.mainPage.pageNavigationSection.onlineBankingPage;
    const onlineBankingActivitesSectionTitle =
      dataSet.mainPage.pageNavigationContent.onlineBankingActivitesSectionTitle;
    const onlineBankingActivitesSectionContent =
      dataSet.mainPage.pageNavigationContent
        .onlineBankingActivitesSectionContent;

    await startPage.verifyPageNavigation(listOfPageNavigation);
    await startPage.clickOnPageNavigation(onlineBankingPage);

    await startPage.waitForWebElement(
      startPageLocators.ourBankIsTrustedHeaderLocator
    );

    await startPage.verifyOnlineBankingTitleSections(
      onlineBankingActivitesSectionTitle
    );
    await startPage.verifyOnlineBankingSectionContent(
      onlineBankingActivitesSectionContent
    );
  });
  test(" =====> Feedback Page | Send Feedback Message 🏠 ▶️	💬 📝 👉 <===== ", async () => {
    const listOfPageNavigation = dataSet.mainPage.listOfPageNavigation;
    const feedbackPage = dataSet.mainPage.pageNavigationSection.feedbackPage;
    const yourName = feedBackData.name;
    const yourEmailAddress = await startPage.generateEmailAddress(yourName);
    const subject = feedBackData.subject;
    const comment = feedBackData.comment;

    await startPage.verifyPageNavigation(listOfPageNavigation);
    await startPage.clickOnPageNavigation(feedbackPage);
    await startPage.fillOutFeedbackForm(
      yourName,
      yourEmailAddress,
      subject,
      comment
    );
    await startPage.clickOnWebElement(
      startPageLocators.sendMessageButtonLocator
    );
    await startPage.verifyFeedbackResult(yourName);
  });
  test(" =====> Feedback Page | Clear Feedback Message 🏠 ▶️ ✅ 💬 👉 <===== ", async () => {
    const listOfPageNavigation = dataSet.mainPage.listOfPageNavigation;
    const feedbackPage = dataSet.mainPage.pageNavigationSection.feedbackPage;
    const yourName = feedBackData.name;
    const yourEmailAddress = await startPage.generateEmailAddress(yourName);
    const subject = feedBackData.subject;
    const comment = feedBackData.comment;

    await startPage.verifyPageNavigation(listOfPageNavigation);
    await startPage.clickOnPageNavigation(feedbackPage);
    await startPage.fillOutFeedbackForm(
      yourName,
      yourEmailAddress,
      subject,
      comment
    );
    await startPage.clickOnWebElement(startPageLocators.clearButtonLocator);
  });
  test(" =====> Feedback Page | Login 🏠 ▶️ ✅ 💬 👉 <===== ", async () => {
    const userName = dataSet.loginCredentials.userName;
    const password = dataSet.loginCredentials.psw;

    await startPage.clickOnWebElement(startPageLocators.signInButtonLocator);
    await loginPage.waitForWebElement(
      loginPageLocators.loginInToZeroBankHeaderLocator
    );
    await loginPage.doLogin(userName, password);
    await page.goBack();
    await page.waitForTimeout(2000);
  });
});
