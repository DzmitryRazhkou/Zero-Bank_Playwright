import { expect } from "@playwright/test";
import BasePage from "./BasePage";

const { startPageLocators } = require("../locators/locators").default;

class StartPage extends BasePage {
  constructor(page) {
    super(page);
    this.zeroBankHeaderButton = page.locator(
      startPageLocators.zeroBankHeaderButtonLocator
    );
    this.pageNavigation = page.locator(startPageLocators.pageNavigationLocator);
    this.homeMenu = page.locator(startPageLocators.homeMenuLocator);
    this.homeContent = page
      .getByText(startPageLocators.homeContentLocator)
      .nth(1);
    this.bankingMenu = page.locator(startPageLocators.bankingMenuLocator);
    this.onlineBankingActivitesSectionTitle = page.locator(
      startPageLocators.onlineBankingActivitesSectionTitleLocator
    );
    this.onlineBankingActivitesSectionContent = page.locator(
      startPageLocators.onlineBankingActivitesSectionContentLocator
    );
    this.feedback = page.locator(startPageLocators.feedbackLocator);
    this.yourNameInput = page.locator(startPageLocators.yourNameInputLocator);
    this.yourEmailAddressInput = page.locator(
      startPageLocators.yourEmailAddressInputLocator
    );
    this.subjectInput = page.locator(startPageLocators.subjectInputLocator);
    this.commentInput = page.locator(startPageLocators.commentInputLocator);
    this.feedbackResultMsg = page.locator(
      startPageLocators.feedbackResultMsgLocator
    );
  }

  async verifyPageNavigation(array) {
    const textArray = await this.pageNavigation.allTextContents();
    expect(textArray).toEqual(array);
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

  async clickOnOnlineBankingActivity(activity) {
    const count = await this.onlineBankingActivitesSectionTitle.count();
    for (let i = 0; i < count; i++) {
      if (
        (await this.onlineBankingActivitesSectionTitle.nth(i).textContent()) ===
        activity
      ) {
        await this.onlineBankingActivitesSectionTitle.nth(i).click();
        break;
      }
    }
  }

  async fillOutFeedbackForm(yourName, yourEmailAddress, subject, comment) {
    await this.yourNameInput.fill(yourName);
    await this.yourEmailAddressInput.fill(yourEmailAddress);
    await this.subjectInput.fill(subject);
    await this.commentInput.fill(comment);
  }

  async verifyFeedbackResult(fullName) {
    const expectedMessage = `Feedback Thank you for your comments, ${fullName}. They will be reviewed by our Customer Service staff and given the full attention that they deserve.`;

    // Get the actual message and normalize the whitespace (remove extra line breaks, tabs, etc.)
    const actualMessage = await this.feedbackResultMsg.textContent();

    // Normalize both the actual and expected message by removing extra spaces, line breaks, and tabs
    const normalizeText = (text) => text.replace(/\s+/g, " ").trim();

    // Compare the normalized actual message with the normalized expected message
    expect(normalizeText(actualMessage)).toBe(normalizeText(expectedMessage));
  }
}

export default StartPage;
