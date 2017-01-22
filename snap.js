chrome.runtime.onInstalled.addListener(function (object) {

  if (chrome.runtime.openOptionsPage) {
    // New way to open options pages, if supported (Chrome 42+).
    chrome.runtime.openOptionsPage();
  } else {
    // Reasonable fallback.
    window.open(chrome.runtime.getURL('options.html'));
  }

});

window.onload = function() {

  // Normalize the various vendor prefixed versions of getUserMedia.
  navigator.getUserMedia = (navigator.getUserMedia ||
                            navigator.webkitGetUserMedia ||
                            navigator.mozGetUserMedia ||
                            navigator.msGetUserMedia);
}

var video = document.getElementById('video-vibes');
var canvas = document.getElementById('canvas-vibes');
var context = canvas.getContext('2d');

function distance_2d(x1, x2, y1, y2) {
  var a = x1 - x2;
  var b = y1 - y2;
  var c = Math.sqrt( a*a + b*b );

  return c;
}

function errBack(object, a) {
  console.log(object);
  console.log(a);
}

function snapPhoto(stream) {

  context.drawImage(video, 0, 0, 640, 480);

  var base64 = canvas.toDataURL();
  var blob = window.dataURLtoBlob(base64);

  jQuery.ajax('https://westus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=true&returnFaceAttributes=age,gender,headPose,smile,facialHair,glasses', {
    headers: {
      'Content-Type': 'application/octet-stream',
      'Ocp-Apim-Subscription-Key': '3c876c12d0954e50975a7f0047e2c1dd',
    },
    method: 'post',
    processData: false,
    data: blob,
    success: function(data, status, xhr) {
      console.log(data);
      console.log(status);

      if (status == 'success' && data.length > 0) {

        chrome.storage.local.get('faceData', function(items) {

          var currentData = data[0];

          var faceData = items.faceData;

          if (!faceData) {
            faceData = {};
          }

          var timestamp = new Date().getTime();
          faceData[timestamp] = currentData;

          chrome.storage.local.set({
            faceData: faceData
          });

        });

      }

      setTimeout(function () {
        var tracks = stream.getTracks();
        for(var i = 0; i < tracks.length; i++) {
          tracks[i].stop();
        }
      }, 1000);
    },
    error: function(xhr, status, error) {
      console.log(error);
      console.log(status);

      setTimeout(function () {
        var tracks = stream.getTracks();
        for(var i = 0; i < tracks.length; i++) {
          tracks[i].stop();
        }
      }, 1000);
    }
  });

}

var freq_id = setInterval(takeSnap, 30000);  // 5 mins

function takeSnap() {
  chrome.storage.sync.get({
    isEnableSnap: true
  }, function(items) {
    if (items.isEnableSnap) {

      // Get access to the camera!
      if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          // Not adding `{ audio: true }` since we only want video now
          navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
              video.src = window.URL.createObjectURL(stream);
              video.play();

              setTimeout(function() {
                snapPhoto(stream);
              }, 5000);
          });
      }
      // Legacy code below: getUserMedia
      else if(navigator.getUserMedia) { // Standard
          navigator.getUserMedia({ video: true }, function(stream) {
              video.src = stream;
              video.play();

              setTimeout(function() {
                snapPhoto(stream);
              }, 5000);
          }, errBack);
      } else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
          navigator.webkitGetUserMedia({ video: true }, function(stream){
              video.src = window.webkitURL.createObjectURL(stream);
              video.play();

              setTimeout(function() {
                snapPhoto(stream);
              }, 5000);
          }, errBack);
      } else if(navigator.mozGetUserMedia) { // Mozilla-prefixed
          navigator.mozGetUserMedia({ video: true }, function(stream){
              video.src = window.URL.createObjectURL(stream);
              video.play();

              setTimeout(function() {
                snapPhoto(stream);
              }, 5000);
          }, errBack);
      }
    }
  });
}
