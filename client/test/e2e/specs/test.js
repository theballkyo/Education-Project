// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('.home', 5000)
      // .assert.elementPresent('.hello')
      // .assert.containsText('h1', 'คอร์สเรียนมาใหม่')
      // .assert.elementCount('img', 1)
      .end()
  }
}
