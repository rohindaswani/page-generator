function randomizeAds(target, source, ads) {
  function playRandomAd() {
    ad = ads[Math.floor(Math.random() * ads.length)];
    document.querySelector(target).src = source + ad.url;
    setTimeout(playRandomAd, ad.duration);
  }
  playRandomAd();
}
