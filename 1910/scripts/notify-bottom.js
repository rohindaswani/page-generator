var armed = true;
window.onscroll = function(event) {
  var y = ('scrollY' in window) ? window.scrollY : document.documentElement.scrollTop;
  if (window.innerHeight + y + 12>= document.body.offsetHeight && armed) {
    window.postMessage('bottom-page', '*');
    armed = false;
  }
};

