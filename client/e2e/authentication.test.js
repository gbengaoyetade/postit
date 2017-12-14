module.exports = {
  'sign up user': (browser) => {
    browser
      .url('http://localhost:3000/')
      .waitForElementVisible('body', 5000)
      .click('a[href=signup]')
      .assert.urlContains('http://localhost:3000/signup')
      .pause(1000)
      .setValue('input[name=fullName]', 'Test user')
      .setValue('input[name=username]', 'test_user')
      .setValue('input[name=password]', 'password')
      .setValue('input[name=email]', 'test@user.com')
      .setValue('input[name=phoneNumber]', '08064140695')
      .setValue('input[name=password]', 'password')
      .click('input[type=submit]')
      .pause(1000)
      .assert.urlContains('http://localhost:3000/dashboard')
      .click('#username')
      .waitForElementVisible('#userDropdown', 1000)
      .end();
  },
  'get to login page': (browser) => {
    browser
    .url('http://localhost:3000/signup')
    .click('#login')
    .assert.urlContains('http://localhost:3000/login')
    .pause(1000)
    .end();
  },
  'login a user': (browser) => {
    browser
    .url('http://localhost:3000/login')
    .setValue('input[name=username]', 'test_user')
    .setValue('input[name=password]', 'password')
    .click('input[type=submit]')
    .waitForElementVisible('body', 5000)
    // .assert.urlContains('http://localhost:3000/dashboard')
    .pause(1000);
  },
  'user should be able to create group': (browser) => {
    browser
    .url('http://localhost:3000/dashboard')
    .click('#group-create')
    .waitForElementVisible('input[name=groupName]', 5000)
    .assert.urlContains('http://localhost:3000/group/create')
    .setValue('input[name=groupName]', 'testGroup')
    .setValue('input[name=groupDescription]', 'groupDescription')
    .click('input[type=submit]')
    .assert.urlContains('http://localhost:3000/group')
    .pause(4000);
  },
  'get forgot password page': (browser) => {
    browser
    .url('http://localhost:3000/login')
    .click('#password-reset')
    .assert.urlContains('http://localhost:3000/password/reset')
    .end();
  },
  // 'get a reset password link': (browser) => {
  //   browser
  //   .url('http://localhost:3000/signup')
  //   .click('#login')
  //   .assert.urlContains('http://localhost:3000/login')
  //   .end();
  // }
};
