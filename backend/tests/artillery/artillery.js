function myAfterResponseHandler(requestParams, response, context, ee, next) {
    console.log(requestParams)
}
const { faker } = require('@faker-js/faker');

function generateRandomData (userContext, events, done) {
    userContext.vars.name = faker.person.firstName() + faker.person.lastName()
    userContext.vars.password = faker.internet.password()
    userContext.vars.email = faker.internet.email()
    return done()
  }
module.exports = {
    myAfterResponseHandler: myAfterResponseHandler,
    generateRandomData: generateRandomData
  }
