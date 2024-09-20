import { expect } from "@playwright/test";
import BasePage from "./BasePage";
import { th } from "@faker-js/faker";

const { loginPageLocators } = require("../locators/locators").default;

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.loginInputField = page.locator(
      loginPageLocators.loginInputFieldLocator
    );
    this.passwordInputField = page.locator(
      loginPageLocators.passwordInputFieldLocator
    );
    this.signInButton = page.locator(loginPageLocators.signInButtonLocator);
  }

  async doLogin(userName, psw) {
    await this.loginInputField.fill(userName);
    await this.passwordInputField.fill(psw);
    await this.signInButton.click();
  }

  async verifyHomePageContent(content) {
    const txt = await this.homeContent.textContent();
    expect(txt).toEqual(content);
  }

  async verifyOnlineBankingTitleSections(array) {
    const textArray =
      await this.onlineBankingActivitesSectionTitle.allTextContents();
    expect(textArray).toEqual(array);
  }

  async verifyOnlineBankingSectionContent(array) {
    const textArray =
      await this.onlineBankingActivitesSectionContent.allTextContents();

    expect(textArray).toEqual(array);
  }

  async clickOnPageNavigation(menuName) {
    const count = await this.pageNavigation.count();
    for (let i = 0; i < count; i++) {
      if ((await this.pageNavigation.nth(i).textContent()) === menuName) {
        await this.pageNavigation.nth(i).click();
        break;
      }
    }
  }
}

export default LoginPage;
