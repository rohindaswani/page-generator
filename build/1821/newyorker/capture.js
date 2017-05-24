console.log("Object.assign", Object.assign);
var page = require('webpage').create();
page.viewportSize = { width: 414, height: 736 };
page.open('http://www.vanityfair.com/news/2016/05/the-stunning-story-of-a-former-nfl-players-descent-into-darkness', function() {
  page.includeJs('https://cdn.polyfill.io/v2/polyfill.min.js', function() {
    page.render('vf.png');
    phantom.exit();
  });
});
