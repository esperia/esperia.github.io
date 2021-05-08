"use strict";

/**
 * https://www.html5rocks.com/ja/tutorials/webaudio/intro/js/buffer-loader.js
 * @param {*} context 
 * @param {*} urlList 
 * @param {*} callback 
 */
function BufferLoader(context, urlList, callback) {
  this.context = context;
  this.urlList = urlList;
  this.onload = callback;
  this.bufferList = new Array();
  this.loadCount = 0;
}

BufferLoader.prototype.loadBuffer = function(url, index) {
  // Load buffer asynchronously
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = "arraybuffer";

  var loader = this;

  request.onload = function() {
    // Asynchronously decode the audio file data in request.response
    loader.context.decodeAudioData(
      request.response,
      function(buffer) {
        if (!buffer) {
          alert('error decoding file data: ' + url);
          return;
        }
        loader.bufferList[index] = buffer;
        if (++loader.loadCount == loader.urlList.length)
          loader.onload(loader.bufferList);
      },
      function(error) {
        console.error('decodeAudioData error', error);
      }
    );
  }

  request.onerror = function() {
    alert('BufferLoader: XHR error');
  }

  request.send();
}

BufferLoader.prototype.load = function() {
  for (var i = 0; i < this.urlList.length; ++i)
  this.loadBuffer(this.urlList[i], i);
}


// a main program
var context;
var bufferLoader;
window.onload = e => {
    // Fix up prefixing
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    context = new AudioContext();
  
    let loadedBuffers;
    bufferLoader = new BufferLoader(context, [
        'typing.mp3',
        'title_call.mp3',
      ], buffers => {
        loadedBuffers = buffers
        startLupin()
      });
    bufferLoader.load();

    function playSound(type) {
      var source = context.createBufferSource();
      source.buffer = (type === 'typing') ? loadedBuffers[0] : loadedBuffers[1]
      source.connect(context.destination);
      source.start(0)
    }

    function startLupin() {
      let lupinEl = document.getElementById('lupin')
      if (!lupinEl) {
        alert('The <div id="lupin">text</div> element does not contain in that document.')
        return
      }
      var text = lupinEl.textContent
      lupinEl.textContent = ''
      loop(0, text, lupinEl, () => {
        playSound('title_call')
      })
    }
    function loop(index, text, lupinEl, callback) {
      setTimeout(() => {
        lupinEl.textContent = text.substring(0, index + 1)
        if (index === text.length) {
          callback()
        } else {
          playSound('typing')
          index += 1
          loop(index, text, lupinEl, callback)
        }
      }, Math.random() * 200 + 200)
    }
};
