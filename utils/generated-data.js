const { faker } = require("@faker-js/faker");
export const feedBackData = {
  name: faker.person.fullName(),
  subject: faker.word.words(),
  comment: faker.word.words({ count: { min: 15, max: 30 } }),
  descriptionTransfer: faker.word.words({ count: { min: 3, max: 5 } }),
  payeeName: faker.person.fullName(),
  payeeAddress: faker.location.streetAddress(),
  payeeDetails: faker.word.words({ count: { min: 3, max: 5 } }),
};
export const sofGeneratedData = {
  fullName: faker.person.fullName().replace(/[',.'"]/g, ""),
  addressFirstLine: faker.location.streetAddress(),
  addressSecondLine: faker.location.secondaryAddress(),
};
