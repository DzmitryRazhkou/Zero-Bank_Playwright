const startPageLocators = {
  zeroBankHeaderButtonLocator: "a:hasText('Zero Bank')",
  pageNavigationLocator: "#pages-nav>li>div",
  onlineBankingFeaturesLocator:
    "#online_banking_features>div>h4, #online_banking_features>div>div>h4>span",
  homeMenuLocator: "#homeMenu",
  homeContentLocator: "Welcome to Zero Online Banking",
  bankingMenuLocator: "#onlineBankingMenu",

  // Navigation Page:
  onlineBankingActivitesSectionTitleLocator:
    "#online_banking_features>div>div>h4>span",
  onlineBankingActivitesSectionContentLocator:
    "#online_banking_features>div>div>p",
  feedbackLocator: "#feedback",
  ourBankIsTrustedHeaderLocator:
    "h3:has-text('Our Bank is trusted by over 1,000,000 customers')",

  //** */
  // Feedback:
  yourNameInputLocator: "#name",
  yourEmailAddressInputLocator: "#email",
  subjectInputLocator: "#subject",
  commentInputLocator: "#comment",
  sendMessageButtonLocator: "input[name='submit']",
  clearButtonLocator: "input[name='clear']",
  feedbackResultMsgLocator:
    "div[class*='offset3']:has-text('Thank you for your comments')",

  //**/ */
  signInButtonLocator: "#signin_button",
};
const loginPageLocators = {
  loginInToZeroBankHeaderLocator: "h3:has-text('Log in to ZeroBank')",
  loginInputFieldLocator: "#user_login",
  passwordInputFieldLocator: "#user_password",
  signInButtonLocator: "input[value='Sign in']",
};
const onlineBankingPageLocators = {
  // Account Summary:
  accountTitlesLocator: "h2[class='board-header']",
  balanceLocator: "div[class='board-content']>table>tbody>tr>td:nth-child(3)",

  // Account Activity:
  accountDropDownLocator: "#aa_accountId",
  findTransactionsButtonLocator: "a[href='#ui-tabs-2']",

  // Find Transactions:
  descriptionInputFieldLocator: "#aa_description",
  datesFromInputFieldLocator: "#aa_fromDate",
  datesToInputFieldLocator: "#aa_toDate",
  amountsFromInputFieldLocator: "#aa_fromAmount",
  amountsToInputFieldLocator: "#aa_toAmount",
  findButtonLocator: "button[type='submit']",
  boardLocator: "div[class='board']",
  noResultsLocator: ".well",

  // Results:
  resultDateLocator:
    "#filtered_transactions_for_account>table>tbody>tr>td:nth-child(1)",
  resultDescriptionLocator:
    "#filtered_transactions_for_account>table>tbody>tr>td:nth-child(2)",
  resultWithdrawalLocator:
    "#filtered_transactions_for_account>table>tbody>tr>td:nth-child(4)",

  // Transfer Money & Make Payments:
  transferMoneyMakePaymentsVerifyLocator: "h2[class='board-header']",
  fromAccountDropDownLocator: "#tf_fromAccountId",
  toAccountDropDownLocator: "#tf_toAccountId",
  amountInputFieldTransferLocator: "#tf_amount",
  descriptionInputFieldTransferLocator: "#tf_description",
  continueButtonLocator: "#btn_submit",
  // Success Msg:
  alertSuccessMsgLocator: "div[class='alert alert-success']",

  // Pay Biils | Pay Saved Payee:
  payeeDropDownLocator: "select[id='sp_payee']",
  accountPayeeDropDownLocator: "#sp_account",
  amountPayeeInputLocator: "#sp_amount",
  datePayeeInputLocator: "#sp_date",
  paySavedpayeesButtonLocator: "#pay_saved_payees",

  // Pay Biils | Add New Payee:
  addNewPayeeSectionButtonLocator: "a[href='#ui-tabs-2']",
  payeeNameInputLocator: "#np_new_payee_name",
  payeeAddressInputLocator: "#np_new_payee_address",
  payeeAccountInputLocator: "#np_new_payee_account",
  payeeDetailsInputLocator: "#np_new_payee_details",
  addNewPayeeButtonLocator: "#add_new_payee",
  descriptionPayeeInputLocator: "#sp_description",
  newPayeeAlertContentLocator: "#alert_content",

  // Pay Biils | Purchase Foreign Currency:
  purchaseForeignCurrencySectionButtonLocator: "a[href='#ui-tabs-3']",
  selectCurrencyDropDownLocator: "#pc_currency",
  currencyAmountInputLocator: "#pc_amount",
  usdRadioButtonLocator: "#pc_inDollars_true",
  calculateCostsButtonLocator: "#pc_calculate_costs",
  conversionAmountLabelLocator: "#pc_conversion_amount",
  purchaseCashButtonLocator: "#purchase_cash",
  foreignCurrencyCashAlertContentLocator: "#alert_content",
};
const sofCheckoutPageLocators = {
  // Account Summary:
  emailInputFieldLocator: "#email",
  phoneInputFieldLocator: "#phone-input",
  iframeCardNumberFieldInputLocator: "#tx_iframe_cardNumber",
  cardNumberFieldInputLocator: "input[name='cardNumber']",
  expirationDateInputFieldLocator: "#expirationDate",
  securityCodeInputFieldLocator: "#securityCode",
  cardHolderNameInputFieldLocator: "#cardHolderName",
  billingFullNameInputFieldLocator: "input[id='billing.fullName']",
  billingAddressLineFirstInputFieldLocator: "input[id='billing.address1']",
  billingAddressLineSecondInputFieldLocator: "input[id='billing.address2']",
  payNowButtonLocator: "#CB-button-pay",
  accountTitlesLocator: "h2[class='board-header']",
  balanceLocator: "div[class='board-content']>table>tbody>tr>td:nth-child(3)",
  billingInfoFullNameLocator: ".personal-info-block>p:first-of-type",
  billingInfoEmailLocator: ".personal-info-block>p:last-of-type",
};
export default {
  startPageLocators,
  loginPageLocators,
  onlineBankingPageLocators,
  sofCheckoutPageLocators,
};
