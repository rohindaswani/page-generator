var page = require('webpage').create();
page.open('http://www.vanityfair.com/news/2016/05/the-stunning-story-of-a-former-nfl-players-descent-into-darkness')
  .then(function() {
    // page.viewportSize = { width: 414, height: 736 };
    page.viewportSize = { height: 414, width: 736 };
    page.render('vf.png');
    slimer.exit();
  });
