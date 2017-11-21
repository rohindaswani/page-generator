function overlayButton(videoNode, buttonNode) {
  var video = document.querySelector(videoNode);
  video.addEventListener('contextmenu',function(e){
    e.preventDefault();
    return false;
  });
  var button = document.querySelector(buttonNode);
  button.addEventListener("click", function(e) { video.play();});
  video.addEventListener('play', function(e) { button.className = "hidden"; });
  video.addEventListener('pause', function(e) { button.className = ""; });
  video.addEventListener('ended', function(e) { window.parent.postMessage('video-ended', '*')});
  video.play();
}
