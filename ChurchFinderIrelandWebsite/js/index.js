var watchID = null;
var directionsDisplay;
var directionsService;
var map;

function initialize() {
  var mapOptions = {
    zoom: 13
  };
  map = new google.maps.Map(document.getElementById('map_canvas'),
      mapOptions);

  // Try HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

		var marker = new google.maps.Marker({
			position: pos,
			map: map,
			icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
			animation: google.maps.Animation.DROP,
			title: "You are here!"
        });

        showChurches();

      map.setCenter(pos);
    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }
}

function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

  var options = {
    map: map,
    position: new google.maps.LatLng(60, 105),
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}

function showChurches() {
    if (window.XMLHttpRequest) {  // code for IE7+, Firefox, Chrome, Opera, Safari
        var xmlhttp = new XMLHttpRequest();
    }
    else {  // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.async = false;
    xmlhttp.open("GET", "http://www.churchfinderireland.com/xmlDatabase.php", false);
    xmlhttp.send();
    var xmlDoc = xmlhttp.responseXML;

    var churchLength = xmlDoc.getElementsByTagName("Church").length;

    for(i = 0; i < churchLength; i++) {
        var churchID = xmlDoc.getElementsByTagName("id")[i].childNodes[0].nodeValue;
        var churchName = xmlDoc.getElementsByTagName("name")[i].childNodes[0].nodeValue;
        var churchCoords = xmlDoc.getElementsByTagName("coordinates")[i].childNodes[0].nodeValue;

        var churchLat = churchCoords.split(',')[0].split(' ').pop();
        var churchLong = churchCoords.substr(churchCoords.indexOf(",") + 1);
        churchLong = churchLong.replace(/\s+/g, '');

        var churchLatLog = new google.maps.LatLng(churchLat, churchLong);

        var markerChurches = new google.maps.Marker({
            position: churchLatLog,
            map: map,
            animation: google.maps.Animation.DROP,
            title: churchName
        });

        markerChurches.set("id", churchID);

        bindMarkerEvents(markerChurches);

    }
}

var bindMarkerEvents = function(marker) {
    google.maps.event.addListener(marker, 'click', function() {
        window.location = "churchDetailsFromMap.html";
        getDetailsFromMap(marker.get("id"));
    });
};