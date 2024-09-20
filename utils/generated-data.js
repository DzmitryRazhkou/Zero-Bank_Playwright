const { faker } = require("@faker-js/faker");
export const feedBackData = {
  name: faker.person.fullName(),
  subject: faker.word.words(),
  comment: faker.word.words({ count: { min: 15, max: 30 } }),
};
