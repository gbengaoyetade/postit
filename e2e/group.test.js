const otherUser = 'Agbo amarachi';

module.exports = {
  'user can create group':
  (browser) => {
    browser
    .url('http://localhost:3000/signup')
    .waitForElementVisible('input[name=fullName]', 3000)
    .setValue('input[name=fullName]', 'oare arene')
    .setValue('input[name=username]', 'oare')
    .setValue('input[name=password]', 'password')
    .setValue('input[name=email]', 'oare@gmail.com')
    .setValue('input[name=phoneNumber]', '09025615561')
    .click('input[type=submit]')
    .pause(1000)
    .assert.urlContains('http://localhost:3000/dashboard')
    .waitForElementVisible('div.user-side-nav', 2000)
    .click('#group-create')
    .waitForElementVisible('input[name=groupName]', 5000)
    .assert.urlContains('http://localhost:3000/group/create')
    .setValue('input[name=groupName]', 'group Name')
    .setValue('input[name=groupDescription]', 'group description')
    .click('input[type=submit]')
    .waitForElementVisible('#more-vert', 5000)
    .assert.urlEquals('http://localhost:3000/group/2')
    .waitForElementVisible('textarea[name=messageBody]', 1000)
    .waitForElementVisible('select[name=messagePriority]', 1000)
    .assert.containsText('p.red-text', 'Group currently has no messages');
  },
  'user can create message':
  (browser) => {
    browser
    .url('http://localhost:3000/group/2')
    .waitForElementVisible('textarea[name=messageBody]', 1000)
    .setValue('textarea[name=messageBody]', 'test message')
    .click('button.message-button')
    .waitForElementVisible('p.message-body', 5000)
    .assert.containsText('p.message-body', 'test message')
    .assert.containsText('p.message-priority small', 'Normal');
  },
  'user can search other users':
  (browser) => {
    browser
    .url('http://localhost:3000/group/2/addmembers')
    .waitForElementVisible('input[name=userSearch]', 5000)
    .setValue('input[name=userSearch]', otherUser)
    .waitForElementVisible('#search-results', 5000)
    .assert.containsText('#search-results span.search-username', otherUser);
  },
  'user can add other user to group':
  (browser) => {
    browser
    .url('http://localhost:3000/group/2/addmembers')
    .waitForElementVisible('input[name=userSearch]', 5000)
    .setValue('input[name=userSearch]', otherUser)
    .waitForElementVisible('#search-results', 5000)
    .assert.containsText('#search-results span.search-username', otherUser)
    .click('a.small.btn')
    .waitForElementVisible('span.right', 3000)
    .assert.containsText('span.right', 'Group member');
  },
  'user can leave group he belongs to':
  (browser) => {
    browser
    .url('http://localhost:3000/group/1')
    .waitForElementVisible('a.dropdown-button', 5000)
    .click('#more-vert')
    .waitForElementVisible('a#leave-group', 2000)
    .click('#leave-group')
    .waitForElementVisible('div.swal-modal', 1000)
    .click('button.swal-button--confirm')
    .waitForElementVisible('button.swal-button--confirm', 1000)
    .click('button.swal-button--confirm')
    .waitForElementVisible('p.center', 3000)
    .assert.urlEquals('http://localhost:3000/dashboard')
    .end();
  },
};

