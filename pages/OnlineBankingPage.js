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
    this.fromAccountDropDown = page.locator(
      onlineBankingPageLocators.fromAccountDropDownLocator
    );
    this.toAccountDropDown = page.locator(
      onlineBankingPageLocators.toAccountDropDownLocator
    );
    this.amountInputFieldTransfer = page.locator(
      onlineBankingPageLocators.amountInputFieldTransferLocator
    );
    this.descriptionInputFieldTransfer = page.locator(
      onlineBankingPageLocators.descriptionInputFieldTransferLocator
    );
    this.continueButton = page.locator(
      onlineBankingPageLocators.continueButtonLocator
    );
    this.transferMoneyMakePaymentsVerify = page.locator(
      onlineBankingPageLocators.transferMoneyMakePaymentsVerifyLocator
    );
    this.alertSuccessMsg = page.locator(
      onlineBankingPageLocators.alertSuccessMsgLocator
    );
    this.payeeDropDown = page.locator(
      onlineBankingPageLocators.payeeDropDownLocator
    );
    this.accountPayeeDropDown = page.locator(
      onlineBankingPageLocators.accountPayeeDropDownLocator
    );
    this.amountPayeeInput = page.locator(
      onlineBankingPageLocators.amountPayeeInputLocator
    );
    this.datePayeeInput = page.locator(
      onlineBankingPageLocators.datePayeeInputLocator
    );
    this.descriptionPayeeInput = page.locator(
      onlineBankingPageLocators.descriptionPayeeInputLocator
    );
    this.paySavedPayeesButton = page.locator(
      onlineBankingPageLocators.paySavedpayeesButtonLocator
    );
    this.addNewPayeeSectionButton = page.locator(
      onlineBankingPageLocators.addNewPayeeSectionButtonLocator
    );
    this.payeeNameInput = page.locator(
      onlineBankingPageLocators.payeeNameInputLocator
    );
    this.payeeAddressInput = page.locator(
      onlineBankingPageLocators.payeeAddressInputLocator
    );
    this.payeeAccountInput = page.locator(
      onlineBankingPageLocators.payeeAccountInputLocator
    );
    this.payeeDetailsInput = page.locator(
      onlineBankingPageLocators.payeeDetailsInputLocator
    );
    this.addNewPayeeButton = page.locator(
      onlineBankingPageLocators.addNewPayeeButtonLocator
    );
    this.newPayeeAlertContent = page.locator(
      onlineBankingPageLocators.newPayeeAlertContentLocator
    );
    this.purchaseForeignCurrencySectionButton = page.locator(
      onlineBankingPageLocators.purchaseForeignCurrencySectionButtonLocator
    );
    this.selectCurrencyDropDown = page.locator(
      onlineBankingPageLocators.selectCurrencyDropDownLocator
    );
    this.currencyAmountInput = page.locator(
      onlineBankingPageLocators.currencyAmountInputLocator
    );
    this.calculateCostsButton = page.locator(
      onlineBankingPageLocators.calculateCostsButtonLocator
    );
    this.usdRadioButton = page.locator(
      onlineBankingPageLocators.usdRadioButtonLocator
    );
    this.conversionAmountLabel = page.locator(
      onlineBankingPageLocators.conversionAmountLabelLocator
    );
    this.purchaseCashButton = page.locator(
      onlineBankingPageLocators.purchaseCashButtonLocator
    );
    this.foreignCurrencyCashAlertContent = page.locator(
      onlineBankingPageLocators.foreignCurrencyCashAlertContentLocator
    );
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

  async doTransferMoneyMakePayments(
    fromAccount,
    toAccount,
    amount,
    description
  ) {
    await this.fromAccountDropDown.selectOption(fromAccount);
    await this.toAccountDropDown.selectOption(toAccount);
    await this.amountInputFieldTransfer.fill(amount);
    await this.descriptionInputFieldTransfer.fill(description);
    await this.continueButton.click();
  }

  async verifyTransferMoneyHeaderTxt(transferMoneyHeaderTxt) {
    const txt = await this.transferMoneyMakePaymentsVerify.textContent();
    expect(txt).toEqual(transferMoneyHeaderTxt);
  }

  async verifyAlertSuccessMsgTxt(alertSuccessMsg) {
    const txt = await this.alertSuccessMsg.textContent();
    const normalizeText = (text) => text.replace(/\s+/g, " ").trim();

    expect(normalizeText(txt)).toBe(normalizeText(alertSuccessMsg));
  }

  async doPayeeSavedPayee(payee, account, amount) {
    this.payeeDropDown.selectOption(payee);
    this.accountPayeeDropDown.selectOption({ label: account });
    this.amountPayeeInput.fill(amount);
  }

  async doClickAddNewPayee() {
    await this.addNewPayeeSectionButton.click();
  }

  async doAddNewPayee(name, address, account, details) {
    await this.payeeNameInput.fill(name);
    await this.payeeAddressInput.fill(address);
    await this.payeeAccountInput.fill(account);
    await this.payeeDetailsInput.fill(details);
    await this.addNewPayeeButton.click();
  }

  async verifyNewPayeeAlertMsg(name) {
    const alertMsg = `The new payee ${name} was successfully created.`;
    const alertMsgContentTxt = await this.newPayeeAlertContent.textContent();
    console.log(" =====> " + alertMsgContentTxt + " <===== ");

    expect(alertMsg).toEqual(alertMsgContentTxt);
  }

  async doClickPurchaseForeignCurrency() {
    await this.purchaseForeignCurrencySectionButton.click();
  }

  async doPurchaseForeignCurrency(currency, amount) {
    await this.selectCurrencyDropDown.selectOption(currency);
    await this.currencyAmountInput.fill(amount);
    await this.usdRadioButton.click();
    await this.calculateCostsButton.click();
    expect(await this.conversionAmountLabel).toContainText("U.S. dollar (USD)");
    await this.purchaseCashButton.click();
  }

  async verifyForeignCurrencyCashAlertMsg(alertMsg) {
    const alertMsgContentTxt =
      await this.foreignCurrencyCashAlertContent.textContent();
    console.log(" =====> " + alertMsgContentTxt + " <===== ");

    expect(alertMsg).toEqual(alertMsgContentTxt);
  }
}

export default OnlineBankingPage;
