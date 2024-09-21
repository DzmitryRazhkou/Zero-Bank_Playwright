import { expect } from "@playwright/test";
import BasePage from "./BasePage";
import { da, th } from "@faker-js/faker";

const { onlineBankingPageLocators } = require("../locators/locators").default;

class OnlineBankingPage extends BasePage {
  constructor(page) {
    super(page);
    this.accountTitles = page.locator(
      onlineBankingPageLocators.accountTitlesLocator
    );
    this.balance = page.locator(onlineBankingPageLocators.balanceLocator);
    this.accountDropDown = page.locator(
      onlineBankingPageLocators.accountDropDownLocator
    );
    this.findTransactionsButton = page.getByLabel(
      onlineBankingPageLocators.findTransactionsButtonLocator
    );
    this.descriptionInputField = page.locator(
      onlineBankingPageLocators.descriptionInputFieldLocator
    );
    this.datesFromInputField = page.locator(
      onlineBankingPageLocators.datesFromInputFieldLocator
    );
    this.datesToInputField = page.locator(
      onlineBankingPageLocators.datesToInputFieldLocator
    );
    this.amountsFromInputField = page.locator(
      onlineBankingPageLocators.amountsFromInputFieldLocator
    );
    this.amountsToInputField = page.locator(
      onlineBankingPageLocators.amountsToInputFieldLocator
    );
    this.findButton = page.locator(onlineBankingPageLocators.findButtonLocator);
    this.resultDate = page.locator(onlineBankingPageLocators.resultDateLocator);
    this.resultDescription = page.locator(
      onlineBankingPageLocators.resultDescriptionLocator
    );
    this.resultWithdrawal = page.locator(
      onlineBankingPageLocators.resultWithdrawalLocator
    );
    this.board = page.locator(onlineBankingPageLocators.boardLocator).nth(1);
    this.noResults = page.locator(onlineBankingPageLocators.noResultsLocator);
  }

  async verifyAccountsTitles(array) {
    const textArray = await this.accountTitles.allTextContents();
    expect(textArray).toEqual(array);
  }
  async verifyBalance(array) {
    let textArray = await this.balance.allTextContents();
    textArray = textArray.map((text) =>
      text.replace(/\s+/g, "").replace("$", "")
    );
    expect(textArray).toEqual(array);
  }
  async selectActivityFromDropDown(account) {
    await this.accountDropDown.selectOption({ label: account });
  }

  async doFindTransaction(description, date, amount) {
    await this.descriptionInputField.fill(description);
    await this.datesFromInputField.fill(date);
    await this.datesToInputField.fill(date);
    await this.board.click();
    await this.amountsFromInputField.fill(amount);
    await this.amountsToInputField.fill(amount);

    await this.findButton.click();
  }

  async verifyNoResults() {
    const noResultsMsg = await this.noResults.textContent();
    expect(noResultsMsg.trim()).toEqual("No results.");
  }
}

export default OnlineBankingPage;
