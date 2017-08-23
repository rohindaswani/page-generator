function addStyle(text){
  var style = document.querySelector("head > style");
  style.appendChild(document.createTextNode(text));
}

function addHeaders(title){
  document.title = title;

  var metaHttpEquiv = document.createElement("meta");
  metaHttpEquiv.httpEquiv = "X-UA-Compatible";
  metaHttpEquiv.content = "IE=edge,chrome=1";
  var metaViewport = document.createElement("meta");
  metaViewport.name = "viewport";
  metaViewport.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0";
  var polyfill = document.createElement("script");
  polyfill.src = "https://cdn.polyfill.io/v2/polyfill.min.js";

  var head = document.querySelector("head");
  head.append(metaHttpEquiv, metaViewport, polyfill, document.createElement("style"));
  addStyle("body { margin: 0; padding: 0; width: 100%; margin: 0 auto; overflow: hidden;}");

}

function addBackgroundImage(source){
  var image = document.createElement("img");
  image.src = source;
  document.body.appendChild(image);

  addStyle("body > img { width: 100vw; }");
}

function addVideo(source, left, top, width){
  var video = document.createElement("video");
  video.src = source;
  video.autoplay = true;
  addStyle("video { width: 100%; height: 100% }");

  var wrapper = document.createElement("div");
  wrapper.classList = "video-wrapper";
  wrapper.append(video);
  addStyle(".video-wrapper { position: absolute; left: " + left + "; top: " + top + "; width: " + width + "; }");

  var button = document.createElement("button");
  var playButton = document.createElement("img");
  playButton.alt = "play";
  playButton.src = "../../assets/play-button.svg";
  button.append(playButton);
  wrapper.append(button);
  document.body.appendChild(wrapper);

  addStyle(".video-wrapper > button {\n" +
      "            background-color: transparent;\n" +
      "            border: none;\n" +
      "            outline: none;\n" +
      "            position: absolute;\n" +
      "            width: 25vw;\n" +
      "            height: 25vw;\n" +
      "            min-width: 70px;\n" +
      "            min-height: 70px;\n" +
      "            max-width: 300px;\n" +
      "            max-height: 300px;\n" +
      "            top: 50%;\n" +
      "            left: 50%;\n" +
      "            transform: translateX(-50%) translateY(-50%);\n" +
      "        }");
  addStyle("button.hidden { display: none; }");

  video.addEventListener('contextmenu',function(e){
    e.preventDefault();
    return false;
  });
  button.addEventListener("click", function(e) { video.play();});
  video.addEventListener('play', function(e) { button.className = "hidden"; });
  video.addEventListener('pause', function(e) { button.className = ""; });
  video.addEventListener('ended', function(e) { window.parent.postMessage('video-ended', '*')});

}


