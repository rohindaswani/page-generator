var key = '1910';

function getSessionValue() {
  var value = {};
  if(sessionStorage.getItem(key)) value = JSON.parse(sessionStorage.getItem(key));
  return value;
}
function setSessionValue(bottom) {
  w = window.location.href.split('/');
  link = w[w.length - 2];
  value[link] = bottom;
  sessionStorage.setItem(key, JSON.stringify(value));
}

var value = getSessionValue();
setSessionValue(false);

window.onmessage = function(event) {
  if (event.data === 'bottom-page') setSessionValue(true);
};
