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

function errBack(object, a) {
  console.log(object);
  console.log(a);
}

function rotatePoint(oldPoint, center, angle) {
  var oldVector = new THREE.Vector2( oldPoint.x, oldPoint.y );
  var centerVector = new THREE.Vector2( center.x, center.y );

  var newVector = oldVector.rotateAround( centerVector, angle );

  var newPoint = {
    x: newVector.x,
    y: newVector.y
  };
  return newPoint;
}

function normalizeFaceData(faceData) {

  faceData.newFaceLandmarks = {
    eyeLeftBottom: rotatePoint(faceData.faceLandmarks.eyeLeftBottom, faceData.faceLandmarks.noseTip, faceData.faceAttributes.headPose.yaw),
    eyeLeftInner: rotatePoint(faceData.faceLandmarks.eyeLeftInner, faceData.faceLandmarks.noseTip, faceData.faceAttributes.headPose.yaw),
    eyeLeftOuter: rotatePoint(faceData.faceLandmarks.eyeLeftOuter, faceData.faceLandmarks.noseTip, faceData.faceAttributes.headPose.yaw),
    eyeLeftTop: rotatePoint(faceData.faceLandmarks.eyeLeftTop, faceData.faceLandmarks.noseTip, faceData.faceAttributes.headPose.yaw),
    eyeRightBottom: rotatePoint(faceData.faceLandmarks.eyeRightBottom, faceData.faceLandmarks.noseTip, faceData.faceAttributes.headPose.yaw),
    eyeRightInner: rotatePoint(faceData.faceLandmarks.eyeRightInner, faceData.faceLandmarks.noseTip, faceData.faceAttributes.headPose.yaw),
    eyeRightOuter: rotatePoint(faceData.faceLandmarks.eyeRightOuter, faceData.faceLandmarks.noseTip, faceData.faceAttributes.headPose.yaw),
    eyeRightTop: rotatePoint(faceData.faceLandmarks.eyeRightTop, faceData.faceLandmarks.noseTip, faceData.faceAttributes.headPose.yaw),
    eyebrowLeftInner: rotatePoint(faceData.faceLandmarks.eyebrowLeftInner, faceData.faceLandmarks.noseTip, faceData.faceAttributes.headPose.yaw),
    eyebrowLeftOuter: rotatePoint(faceData.faceLandmarks.eyebrowLeftOuter, faceData.faceLandmarks.noseTip, faceData.faceAttributes.headPose.yaw),
    eyebrowRightInner: rotatePoint(faceData.faceLandmarks.eyebrowRightInner, faceData.faceLandmarks.noseTip, faceData.faceAttributes.headPose.yaw),
    eyebrowRightOuter: rotatePoint(faceData.faceLandmarks.eyebrowRightOuter, faceData.faceLandmarks.noseTip, faceData.faceAttributes.headPose.yaw),
    mouthLeft: rotatePoint(faceData.faceLandmarks.mouthLeft, faceData.faceLandmarks.noseTip, faceData.faceAttributes.headPose.yaw),
    mouthRight: rotatePoint(faceData.faceLandmarks.mouthRight, faceData.faceLandmarks.noseTip, faceData.faceAttributes.headPose.yaw),
    noseLeftAlarOutTip: rotatePoint(faceData.faceLandmarks.noseLeftAlarOutTip, faceData.faceLandmarks.noseTip, faceData.faceAttributes.headPose.yaw),
    noseLeftAlarTop: rotatePoint(faceData.faceLandmarks.noseLeftAlarTop, faceData.faceLandmarks.noseTip, faceData.faceAttributes.headPose.yaw),
    noseRightAlarOutTip: rotatePoint(faceData.faceLandmarks.noseRightAlarOutTip, faceData.faceLandmarks.noseTip, faceData.faceAttributes.headPose.yaw),
    noseRightAlarTop: rotatePoint(faceData.faceLandmarks.noseRightAlarTop, faceData.faceLandmarks.noseTip, faceData.faceAttributes.headPose.yaw),
    noseRootLeft: rotatePoint(faceData.faceLandmarks.noseRootLeft, faceData.faceLandmarks.noseTip, faceData.faceAttributes.headPose.yaw),
    noseRootRight: rotatePoint(faceData.faceLandmarks.noseRootRight, faceData.faceLandmarks.noseTip, faceData.faceAttributes.headPose.yaw),
    noseTip: rotatePoint(faceData.faceLandmarks.noseTip, faceData.faceLandmarks.noseTip, faceData.faceAttributes.headPose.yaw),
    pupilLeft: rotatePoint(faceData.faceLandmarks.pupilLeft, faceData.faceLandmarks.noseTip, faceData.faceAttributes.headPose.yaw),
    pupilRight: rotatePoint(faceData.faceLandmarks.pupilRight, faceData.faceLandmarks.noseTip, faceData.faceAttributes.headPose.yaw),
    underLipBottom: rotatePoint(faceData.faceLandmarks.underLipBottom, faceData.faceLandmarks.noseTip, faceData.faceAttributes.headPose.yaw),
    underLipTop: rotatePoint(faceData.faceLandmarks.underLipTop, faceData.faceLandmarks.noseTip, faceData.faceAttributes.headPose.yaw),
    upperLipBottom: rotatePoint(faceData.faceLandmarks.upperLipBottom, faceData.faceLandmarks.noseTip, faceData.faceAttributes.headPose.yaw),
    upperLipTop: rotatePoint(faceData.faceLandmarks.upperLipTop, faceData.faceLandmarks.noseTip, faceData.faceAttributes.headPose.yaw),
  };

  return faceData;
}

function snapPhoto(stream) {

  context.drawImage(video, 0, 0, 640, 480);

  var base64 = canvas.toDataURL();
  var blob = window.dataURLtoBlob(base64);

  var type = "FACE_DETECTION";
  // to debug the image
  // jQuery('body').append('<img src="'+base64+'" />');
  // instead of blob. content.replace("data:image/jpeg;base64,", "")
  var json = '{' +
    ' "requests": [' +
    '	{ ' +
    '	  "image": {' +
    '	    "content":"' + base64.slice(22) + '"' +
    '	  },' +
    '	  "features": [' +
    '	      {' +
    '	      	"type": "' + type + '",' +
    '			"maxResults": 20' +
    '	      }' +
    '	  ]' +
    '	}' +
    ']' +
    '}';
  jQuery.ajax('https://vision.googleapis.com/v1/images:annotate?fields=responses&key=AIzaSyDUVxulQRtAi4ThIlmf29mokkMeelGAzks', {
    method: 'post',
    headers: {
      "Content-Type": "application/json",
    },
    dataType: 'json',
    data: json,
    success: function(data, textStatus, jqXHR) {
      console.log(data);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log('ERRORS: ' + textStatus + ' ' + JSON.stringify(errorThrown));
    }
  });

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

          currentData = normalizeFaceData(currentData);

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
