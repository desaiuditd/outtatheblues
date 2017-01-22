/**
 * Created by Mj on 1/22/2017.
 */

google.charts.load("current", {"packages": ["corechart"]});
function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ["Age", "Weight"],
    [ 8,      12],
    [ 4,      5.5],
    [ 11,     14],
    [ 4,      5],
    [ 3,      3.5],
    [ 6.5,    7]
  ]);

  var options = {
    "title": "Age vs. Weight comparison",
    "hAxis": {"title": "Age", "minValue": 0, "maxValue": 15},
    "vAxis": {"title": "Weight", "minValue": 0, "maxValue": 15},
    "legend": "none"
  };

  var chart = new google.visualization.ScatterChart(document.getElementById("chart_div"));

  chart.draw(data, options);
}
// google.charts.setOnLoadCallback(drawChart);

chrome.storage.local.get('faceFrameData', function (items) {
  console.log(items);
  createTable(items);
});
function createTable(items) {
  var table = document.createElement('table');
  table.style.width = '100%';
  var tableBody = document.createElement('tbody');
  var header = table.createTHead();
  var row = header.insertRow(0);
  var cell = row.insertCell(0);
  cell.innerHTML = "<b>S. No.</b>";
  var cell2 = row.insertCell(1);
  cell2.innerHTML = "<b>Length to width Ratio</b>";
  var cell3 = row.insertCell(2);
  cell3.innerHTML = "<b>Cheek Variations</b>"
  var i = 1;
  items.faceFrameData[0].faceFrame.forEach(function(rowData) {

    var row = document.createElement('tr');
    var cell0 = document.createElement('td');
    cell0.appendChild(document.createTextNode(i++));
    row.appendChild(cell0);
    var cell = document.createElement('td');
    cell.appendChild(document.createTextNode(rowData.lengthRatio));
    row.appendChild(cell);
    var cell2 = document.createElement('td');
    cell2.appendChild(document.createTextNode(rowData.areaRatio));
    row.appendChild(cell2);
    tableBody.appendChild(row);
  });

  table.appendChild(tableBody);
  document.body.appendChild(table);
}

function tableCreate() {
  var body = document.getElementsByTagName('body')[0];
  var tbl = document.createElement('table');
  tbl.style.width = '100%';
  tbl.setAttribute('border', '1');
  var tbdy = document.createElement('tbody');
  for (var i = 0; i < 3; i++) {
    var tr = document.createElement('tr');
    for (var j = 0; j < 2; j++) {
      if (i == 2 && j == 1) {
        break
      } else {
        var td = document.createElement('td');
        td.appendChild(document.createTextNode('\u0020'))
        i == 1 && j == 1 ? td.setAttribute('rowSpan', '2') : null;
        tr.appendChild(td)
      }
    }
    tbdy.appendChild(tr);
  }
  tbl.appendChild(tbdy);
  body.appendChild(tbl)
}
