import { expect } from "@playwright/test";
import BasePage from "./BasePage";

const { onlineBankingPageLocators } = require("../locators/locators").default;

class OnlineBankingPage extends BasePage {
  constructor(page) {
    super(page);
    this.accountTitles = page.locator(
      onlineBankingPageLocators.accountTitlesLocator
    );
    this.balance = page.locator(onlineBankingPageLocators.balanceLocator);
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
}

export default OnlineBankingPage;
