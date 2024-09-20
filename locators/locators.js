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
};
export default {
  startPageLocators,
  loginPageLocators,
  onlineBankingPageLocators,
};
