
const username = 'michi';
const fullName = 'Agbo amarachi';
const email = 'amarachi@gmail.com';
const password = 'mypassword';
const phoneNumber = '08064140695';
module.exports = {
  'user gets error messages when trying to signup with invalid data':
  (browser) => {
    browser
      .url('http://localhost:3000/')
      .waitForElementVisible('body', 5000)
      .click('a[href=signup]')
      .assert.urlContains('http://localhost:3000/signup')
      .pause(1000)
      .setValue('input[name=fullName]', '$John Doe ')
      .setValue('input[name=username]', 'john doe')
      .setValue('input[name=password]', '123')
      .setValue('input[name=email]', 'johndoe@gmail')
      .setValue('input[name=phoneNumber]', 'sting')
      .click('input[type=submit]')
      .pause(1000)
      .assert.containsText('#fullname-error', 'Name can only be alphabets')
      .assert.containsText('#username-error',
      'Username cannot contain special characters aside from _')
      .assert.containsText('#email-error', 'Not a valid email address')
      .assert.containsText('#password-error',
      'Password cannot be less than 6 characters')
      .assert.containsText('#phoneNumber-error', 'Phone number not valid');
  },
  'user can signup when inputs are valid':
  (browser) => {
    browser
      .url('http://localhost:3000/')
      .waitForElementVisible('body', 5000)
      .click('a[href=signup]')
      .assert.urlContains('http://localhost:3000/signup')
      .pause(1000)
      .setValue('input[name=fullName]', fullName)
      .setValue('input[name=username]', username)
      .setValue('input[name=password]', password)
      .setValue('input[name=email]', email)
      .setValue('input[name=phoneNumber]', phoneNumber)
      .click('input[type=submit]')
      .pause(1000)
      .assert.urlContains('http://localhost:3000/dashboard')
      .assert.containsText('div.postit-card p.header', 'Postit')
      .click('#username')
      .waitForElementVisible('#userDropdown', 1000);
  },
  'user can logout of the application':
  (browser) => {
    browser
    .url('http://localhost:3000/dashboard')
    .waitForElementVisible('#username', 3000)
    .click('#username')
    .waitForElementVisible('#logout', 3000)
    .click('#logout')
    .assert.urlEquals('http://localhost:3000/login#');
  },
  'user cannot login when username and or password is incorrect':
  (browser) => {
    browser
    .url('http://localhost:3000/login')
    .setValue('input[name=username]', username)
    .setValue('input[name=password]', 'wrong password')
    .click('input[type=submit]')
    .waitForElementVisible('p.red-text.center', 5000)
    .assert.urlEquals('http://localhost:3000/login')
    .assert.containsText('p.red-text.center',
    'Username or password incorrect  ')
    .pause(1000);
  },
  'user can login when username and password are correct':
  (browser) => {
    browser
    .url('http://localhost:3000/login')
    .setValue('input[name=username]', username)
    .setValue('input[name=password]', password)
    .click('input[type=submit]')
    .waitForElementVisible('body', 5000)
    .assert.urlEquals('http://localhost:3000/dashboard')
    .assert.containsText('p.center.header', 'My Groups')
    .pause(1000);
  },
  'user cannot request password change for invalid email':
  (browser) => {
    browser
    .url('http://localhost:3000/login')
    .click('#password-reset')
    .assert.urlEquals('http://localhost:3000/password/reset')
    .setValue('input[name=email]', 'wrongemail@gmail.com')
    .click('input[type=submit]')
    .waitForElementVisible('p.red-text', 3000)
    .assert.containsText('p.red-text',
    'Email address does not exist on Postit');
  },
  'user can request password reset link with correct email':
  (browser) => {
    browser
    .url('http://localhost:3000/login')
    .click('#password-reset')
    .assert.urlEquals('http://localhost:3000/password/reset')
    .setValue('input[name=email]', email)
    .click('input[type=submit]')
    .waitForElementVisible('div.progress', 3000)
    .waitForElementVisible('h2.center', 5000)
    .assert.urlEquals('http://localhost:3000/email/sent')
    .assert.containsText('h2.center', 'Mail Sent')
    .end();
  },
};
