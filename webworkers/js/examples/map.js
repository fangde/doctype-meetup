var p1 = [{"x":161,"y":37},{"x":143,"y":177},{"x":102,"y":50},{"x":162,"y":13},{"x":141,"y":88},{"x":106,"y":91},{"x":178,"y":29},{"x":9,"y":139},{"x":150,"y":91},{"x":195,"y":77},{"x":36,"y":43},{"x":158,"y":7},{"x":14,"y":190},{"x":139,"y":60},{"x":198,"y":125},{"x":2,"y":169},{"x":198,"y":163},{"x":116,"y":48},{"x":53,"y":196},{"x":106,"y":150},{"x":72,"y":74},{"x":11,"y":82},{"x":183,"y":102},{"x":64,"y":60},{"x":145,"y":69},{"x":14,"y":194},{"x":187,"y":198},{"x":91,"y":155},{"x":186,"y":61},{"x":8,"y":13},{"x":36,"y":151},{"x":144,"y":105},{"x":186,"y":136},{"x":84,"y":79},{"x":43,"y":107},{"x":24,"y":153},{"x":176,"y":138},{"x":147,"y":27},{"x":194,"y":28},{"x":147,"y":41},{"x":152,"y":157},{"x":50,"y":180},{"x":6,"y":16},{"x":144,"y":1},{"x":37,"y":72},{"x":105,"y":12},{"x":164,"y":139},{"x":79,"y":151},{"x":13,"y":186},{"x":114,"y":145},{"x":161,"y":37},{"x":143,"y":177},{"x":102,"y":50},{"x":162,"y":13},{"x":141,"y":88},{"x":106,"y":91},{"x":178,"y":29},{"x":9,"y":139},{"x":150,"y":91},{"x":195,"y":77},{"x":36,"y":43},{"x":158,"y":7},{"x":14,"y":190},{"x":139,"y":60},{"x":198,"y":125},{"x":2,"y":169},{"x":198,"y":163},{"x":116,"y":48},{"x":53,"y":196},{"x":106,"y":150},{"x":72,"y":74},{"x":11,"y":82},{"x":183,"y":102},{"x":64,"y":60},{"x":145,"y":69},{"x":14,"y":194},{"x":187,"y":198},{"x":91,"y":155},{"x":186,"y":61},{"x":8,"y":13},{"x":36,"y":151},{"x":144,"y":105},{"x":186,"y":136},{"x":84,"y":79},{"x":43,"y":107},{"x":24,"y":153},{"x":176,"y":138},{"x":147,"y":27},{"x":194,"y":28},{"x":147,"y":41},{"x":152,"y":157},{"x":50,"y":180},{"x":6,"y":16},{"x":144,"y":1},{"x":37,"y":72},{"x":105,"y":12},{"x":164,"y":139},{"x":79,"y":151},{"x":13,"y":186},{"x":114,"y":145},{"x":178,"y":190},{"x":14,"y":114},{"x":86,"y":184},{"x":167,"y":136},{"x":26,"y":36},{"x":50,"y":22},{"x":14,"y":7},{"x":190,"y":182},{"x":140,"y":165},{"x":44,"y":163},{"x":136,"y":180},{"x":192,"y":142},{"x":122,"y":59},{"x":57,"y":65},{"x":120,"y":79},{"x":69,"y":166},{"x":65,"y":183},{"x":72,"y":95},{"x":111,"y":185},{"x":170,"y":172},{"x":25,"y":82},{"x":160,"y":176},{"x":177,"y":19},{"x":141,"y":121},{"x":122,"y":176},{"x":133,"y":124},{"x":115,"y":47},{"x":10,"y":66},{"x":77,"y":64},{"x":167,"y":187},{"x":126,"y":95},{"x":112,"y":84},{"x":24,"y":187},{"x":86,"y":6},{"x":152,"y":47},{"x":95,"y":31},{"x":128,"y":179},{"x":106,"y":68},{"x":102,"y":75},{"x":89,"y":126},{"x":134,"y":43},{"x":26,"y":174},{"x":33,"y":80},{"x":194,"y":198},{"x":70,"y":186},{"x":149,"y":98},{"x":33,"y":71},{"x":61,"y":110},{"x":153,"y":153},{"x":44,"y":55},{"x":178,"y":90},{"x":25,"y":94},{"x":195,"y":183},{"x":120,"y":61},{"x":181,"y":89},{"x":74,"y":4},{"x":77,"y":142},{"x":14,"y":85},{"x":28,"y":66},{"x":182,"y":128},{"x":76,"y":42},{"x":88,"y":197},{"x":127,"y":186},{"x":30,"y":65},{"x":124,"y":9}];

(function() {
    var markersArray = [];
    var map = null;
    var useThreads = false;


          document.querySelector('#w-wrapper').addEventListener('click', function(event) {
            if (!map) {
              map = new google.maps.Map(document.querySelector('#wmap'), {
                zoom: 3,
                center: new google.maps.LatLng(13, 13),
                mapTypeId: google.maps.MapTypeId.ROADMAP
              });
              map.getDiv().style.border =  '1px solid #ccc';
              drawPoints();
            }

            if (event.target.id == 'find-route-y') {
              useThreads = true;
              document.querySelector('#w-loading').style.visibility = 'visible';
              test();
            } else if (event.target.id == 'find-route-n'){
              useThreads = false;
              document.querySelector('#w-loading').style.visibility = 'visible';
              // this setTimout is so that we see the 'loading' label
              setTimeout(function() { test(); }, 10);
            }
          }, false);

          function drawPath(path) {
            var firstPoint = true;
            var l = p1.length;
            var scaleFactor = 5;
            for (var i = 0; i < l - 1; ++i) {
              var points = [
                new google.maps.LatLng(p1[i].x / scaleFactor,
                                       p1[i].y / scaleFactor),
                new google.maps.LatLng(p1[i + 1].x / scaleFactor,
                                       p1[i + 1].y / scaleFactor)
              ];
              var polyline = new google.maps.Polyline(
                  {path: points, strokeColor: '#ff0000', strokeWeight: 1});
              markersArray.push(polyline);
              polyline.setMap(map);
            }
          }

          function drawPoints() {
            var blueIcon = new google.maps.MarkerImage(
                '/img/point.png',
                new google.maps.Size(3, 3), // size
                new google.maps.Point(0, 0), // origin
                new google.maps.Point(0, 0)); // anchor
            for (var i = 0; i < p1.length; ++i) {
              // Render in Gmap instead of canvas
              var point = new google.maps.LatLng(p1[i].x / 5, p1[i].y / 5);
              var marker = new google.maps.Marker({
                  position: point, icon: blueIcon, map: map});
              markersArray.push(marker);
            }
          }

          function deleteOverlays() {
            if (markersArray) {
              for (var i in markersArray) {
                markersArray[i].setMap(null);
              }
              markersArray = [];
            }
          }

          function test() {
            var name = "Test 1";
            var self = this;
            deleteOverlays();
            drawPoints();
            setTimeout(function() {
              var opts = {
                points: p1,
                t0: 1,
                g: 0.99,
                stepsPerT: 10
              };
              var callback = {
                name: name,
                newMin: function(p) {
                },
                draw: function(p) {
                  document.querySelector('#w-loading').style.visibility = 'hidden';
                  drawPath(p);
                }
              };
              var a;
              if (useThreads) {
                var worker = new Worker('/js/workers/map-router.js')
                worker.onmessage = function(event) {
                  var returnedData = JSON.parse(event.data);
                  var msg = returnedData[0];
                  var p = returnedData[1];
                  callback[msg](p);
                };
                worker.onerror = function(event) {
                  console.log(event);
                };
                worker.postMessage(JSON.stringify({
                  opts: opts,
                  width: 200,
                  height: 200
                }));
              } else {
                var annealing = new Annealing();
                var callback2 = {
                  onNewMin: function(p) {
                    // postMessage('newmin')
                  },
                  onDone: function(p) {
                    document.querySelector('#w-loading').style.visibility = 'hidden';
                    drawPath(p);
                  }
                };
                annealing.init(opts, opts.width, opts.height, callback2);
                annealing.go();
              }
            }, 10);
          }
        })();