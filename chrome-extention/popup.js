// Elements for taking the snapshot
var video = document.getElementById('video-vibes');
var canvas = document.getElementById('canvas-vibes');
var context = canvas.getContext('2d');

function errBack(object, a) {
  console.log(object);
  console.log(a);
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

// Get access to the camera!
if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Not adding `{ audio: true }` since we only want video now
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        video.src = window.URL.createObjectURL(stream);
        video.play();
    });
}
// Legacy code below: getUserMedia
else if(navigator.getUserMedia) { // Standard
    navigator.getUserMedia({ video: true }, function(stream) {
        video.src = stream;
        video.play();
    }, errBack);
} else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
    navigator.webkitGetUserMedia({ video: true }, function(stream){
        video.src = window.webkitURL.createObjectURL(stream);
        video.play();
    }, errBack);
} else if(navigator.mozGetUserMedia) { // Mozilla-prefixed
    navigator.mozGetUserMedia({ video: true }, function(stream){
        video.src = window.URL.createObjectURL(stream);
        video.play();
    }, errBack);
}

// Trigger photo take
document.getElementById("snap-vibes").addEventListener("click", function() {
	context.drawImage(video, 0, 0, 640, 480);

  var base64 = canvas.toDataURL();
  var blob = window.dataURLtoBlob(base64);

  var type = "FACE_DETECTION";
  // to debug the image
  jQuery('body').append('<img src="'+base64+'" />');
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
    '			"maxResults": 200' +
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
      var leftEar = data.responses[0].faceAnnotations[0].landmarks[28].position;
      var rightEar = data.responses[0].faceAnnotations[0].landmarks[29].position;

      var widthOfFace = distance(leftEar, rightEar);

      var forehead = data.responses[0].faceAnnotations[0].landmarks[30].position;
      var chin = data.responses[0].faceAnnotations[0].landmarks[31].position;

      var lengthOfFace = distance(forehead, chin);

      var chinLeft = data.responses[0].faceAnnotations[0].landmarks[32].position;
      var chinRight = data.responses[0].faceAnnotations[0].landmarks[33].position;

      var lowerWidthOfFace = distance(chinLeft, chinRight);

      var faceFrameData = {'length': lengthOfFace, 'upperWidth': widthOfFace, 'lowerWidth': lowerWidthOfFace};
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log('ERRORS: ' + textStatus + ' ' + errorThrown);
      alert('ERRORS: ' + textStatus);
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

          var row = '';
          row += '<tr>';
            row += ( '<td>' + new Date(parseInt(timestamp)) + '</td>' );
            row += ( '<td>' + currentData.faceAttributes.age + '</td>' );
            row += ( '<td>' + currentData.faceAttributes.gender + '</td>' );
            row += ( '<td>' + currentData.faceAttributes.smile + '</td>' );
          row += '</tr>';

          jQuery('#facedata-values table tbody').append(row);

        });

      }

    },
    error: function(xhr, status, error) {
      console.log(error);
      console.log(status);
    }
  });
});

chrome.storage.local.get('faceData', function(items) {

  var html = '';

  _.each(items.faceData, function(ele, index, list) {
    html += '<tr>';
      html += ( '<td>' + new Date(parseInt(index)) + '</td>' );
      html += ( '<td>' + ele.faceAttributes.age + '</td>' );
      html += ( '<td>' + ele.faceAttributes.gender + '</td>' );
      html += ( '<td>' + ele.faceAttributes.smile + '</td>' );
    html += '</tr>';
  });

  if (html == '') {
    html += '<p class="bg-warning text-warning">No data found !</p>';
  } else {
    var tableStart = '<table class="table table-bordered table-striped table-hover table-condensed">';
    var thead = '<thead><tr><th>Date</th><th>Age</th><th>Gender</th><th>Smile Index</th></tr></thead>';
    var tfoot = '<tfoot><tr><th>Date</th><th>Age</th><th>Gender</th><th>Smile Index</th></tr></tfoot>';
    var tableEnd = '</table>';
    html = tableStart + thead + tfoot + '<tbody>' + html + '</tbody>' + tableEnd ;
  }

  jQuery('#facedata-values').html(html);
});
