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

function distance(point1, point2) {
  var vector1 = new THREE.Vector2( point1.x, point1.y );
  var vector2 = new THREE.Vector2( point2.x, point2.y );
  var distance = vector1.distanceTo(vector2);
  console.log(distance);
  return distance;
}

function midPoint(point1, point2) {
  var midpointX = (point1.x + point2.x)/2;
  var midpointY = (point1.y + point2.y)/2;
  console.log(midpointX, midpointY);
  return {x: midpointX, y: midpointY};
}

function areaOfPolygon(vertices) {
  // Vertices have to be in order.
  var total = 0;

  for (var i = 0, l = vertices.length; i < l; i++) {

    var addX = vertices[i].x;
    var addY = vertices[i == vertices.length - 1 ? 0 : i + 1].y;
    var subX = vertices[i == vertices.length - 1 ? 0 : i + 1].x;
    var subY = vertices[i].y;

    total += (addX * addY * 0.5);
    total -= (subX * subY * 0.5);
  }
  console.log(total);
  return total;
}
function perimeterOfPolygon(vertices) {
  var total = 0;
  for (var i = 0; i < vertices.length - 1; i++) {
    total += distance(vertices[i], vertices[i + 1]);
  }
  console.log(total);
  return total;
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
  var timestamp = new Date().getTime();
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
      var faceFrameData = findFaceFrame(data, timestamp);
      // Store it in chrome local storage.
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

function findFaceFrame(data, timestamp) {
  var leftEar = data.responses[0].faceAnnotations[0].landmarks[28].position;
  var rightEar = data.responses[0].faceAnnotations[0].landmarks[29].position;

  var widthOfFace = distance(leftEar, rightEar);

  var forehead = data.responses[0].faceAnnotations[0].landmarks[30].position;
  var chin = data.responses[0].faceAnnotations[0].landmarks[31].position;

  var lengthOfFace = distance(forehead, chin);

  var chinLeft = data.responses[0].faceAnnotations[0].landmarks[32].position;
  var chinRight = data.responses[0].faceAnnotations[0].landmarks[33].position;

  var lowerWidthOfFace = distance(chinLeft, chinRight);

  var cheeksArea = findCheekArea(data);
  // var of poly.
  var pt1 = data.responses[0].faceAnnotations[0].boundingPoly.vertices[0];
  var pt2 = data.responses[0].faceAnnotations[0].boundingPoly.vertices[1];
  var len = distance(pt1, pt2);
  var lengthRatio = (lengthOfFace * 3)/(widthOfFace + lowerWidthOfFace);
  var areaRatio = (cheeksArea/(len * len))*100;
  // check for status and see if previous data is nearby or not.
  var faceFrames = {
    'lengthRatio': lengthRatio,
    'areaRatio': areaRatio
  };
  // store them in local storage.
  var alert = 0;
  chrome.storage.local.get('faceFrameData', function (items) {
    var faceFrameData = items.faceFrameData;
    if (!faceFrameData) {
      faceFrameData = [{'faceFrame': [], 'averageLength': 0, 'stdDevLength': 0, 'averageArea': 0, 'stdDevArea': 0}];
    }
    // check for unusual behavior.
    console.log(faceFrameData);
    if (faceFrameData[0].faceFrame.length > 0) {
      // check for alert condition.
      if (Math.abs(faceFrameData[0].averageLength - faceFrames.lengthRatio) > faceFrameData[0].stdDevLength) {
        alert += 1;
      }
      if (Math.abs(faceFrameData[0].averageArea - faceFrames.areaRatio) > faceFrameData[0].stdDevArea) {
        alert += 1;
      }
      // Compute average. and std dev.
      faceFrameData[0].averageLength = ((faceFrameData[0].averageLength * faceFrameData[0].faceFrame.length)
        + faceFrames.lengthRatio) / (faceFrameData[0].faceFrame.length + 1);
      faceFrameData[0].averageArea = ((faceFrameData[0].averageArea * faceFrameData[0].faceFrame.length)
        + faceFrames.areaRatio) / (faceFrameData[0].faceFrame.length + 1);
      var diffLength = 0;
      var diffArea = 0;
      faceFrameData[0].faceFrame.forEach(function (entry) {
        var temp = faceFrameData[0].averageLength - entry.lengthRatio;
        diffLength += temp * temp;
        temp = faceFrameData[0].averageArea - entry.areaRatio;
        diffArea += temp * temp;
      })
      faceFrameData[0].stdDevLength = Math.sqrt(diffLength);
      faceFrameData[0].stdDevArea = Math.sqrt(diffArea);
    } else {
      faceFrameData[0].averageLength = faceFrames.lengthRatio;
      faceFrameData[0].averageArea = faceFrames.areaRatio;
    }
    faceFrameData[0].faceFrame.splice(timestamp, 0, faceFrames);
    // faceFrameData.faceFrame[timestamp] = faceFrames;
    chrome.storage.local.set({faceFrameData: faceFrameData});
    // create appropriate alert here. If needed.
  });
  if (alert > 0) {
    // show a page. to be loaded.
    alert('Critical');
  }
  // if regression results are alerting, show a page with results and recommendations.
  console.log(faceFrames);
}

function findCheekArea(data) {
  var leftEyeRC = data.responses[0].faceAnnotations[0].landmarks[17].position;
  var leftEyeLC = data.responses[0].faceAnnotations[0].landmarks[19].position;
  var leftEar = data.responses[0].faceAnnotations[0].landmarks[28].position;
  var leftChin = data.responses[0].faceAnnotations[0].landmarks[32].position;
  var leftMouth = data.responses[0].faceAnnotations[0].landmarks[10].position;
  var leftNoseB = data.responses[0].faceAnnotations[0].landmarks[14].position;

  var inputLeft = [];
  inputLeft.push(leftEyeRC, leftEyeLC, leftEar, leftChin, leftMouth, leftNoseB);
  var areaLeft = areaOfPolygon(inputLeft);

  var rightEyeLC = data.responses[0].faceAnnotations[0].landmarks[24].position;
  var rightEyeRC = data.responses[0].faceAnnotations[0].landmarks[22].position;
  var rightEar = data.responses[0].faceAnnotations[0].landmarks[29].position;
  var rightChin = data.responses[0].faceAnnotations[0].landmarks[33].position;
  var rightMouth = data.responses[0].faceAnnotations[0].landmarks[11].position;
  var rightNoseB = data.responses[0].faceAnnotations[0].landmarks[13].position;

  var inputRight = [];
  inputRight.push(rightEyeLC, rightEyeRC, rightEar, rightChin, rightMouth, rightNoseB);
  var areaRight = areaOfPolygon(inputRight);

  console.log(areaLeft);
  console.log(areaRight);
  return Math.max(Math.abs(areaLeft), Math.abs(areaRight));
}
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
