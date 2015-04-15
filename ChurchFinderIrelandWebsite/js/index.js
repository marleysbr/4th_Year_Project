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

function getChurches() {
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

    for(var i = 0; i < churchLength; i++) {

        var churchID = xmlDoc.getElementsByTagName("id")[i].childNodes[0].nodeValue;
        var churchName = xmlDoc.getElementsByTagName("name")[i].childNodes[0].nodeValue;
        var churchCity = xmlDoc.getElementsByTagName("city")[i].childNodes[0].nodeValue;
        var churchCounty = xmlDoc.getElementsByTagName("county")[i].childNodes[0].nodeValue;

        $("#result_list").append("<a href='#' class='list-group-item'><b><h4>" + churchName + "</h4></b><p> - <b>City:</b> " + churchCity +" - <b>County:</b> " + churchCounty + "</p></a>");

    }

    /*$('.test').click(function() {
     getDetails($(this).attr("id"));
     }); */
}

function getNearMass() {

    $('#result_listNear').empty();

    // Try HTML5 geolocation
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = new google.maps.LatLng(position.coords.latitude,
                position.coords.longitude);

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
                var churchCity = xmlDoc.getElementsByTagName("city")[i].childNodes[0].nodeValue;
                var churchCounty = xmlDoc.getElementsByTagName("county")[i].childNodes[0].nodeValue;

                var churchCoordinates = xmlDoc.getElementsByTagName("coordinates")[i].childNodes[0].nodeValue;
                var churchLat = churchCoordinates.split(',')[0].split(' ').pop();
                var churchLong = churchCoordinates.substr(churchCoordinates.indexOf(",") + 1);
                var churchLong = churchLong.replace(/\s+/g, '');

                var distance = getDistanceFromLatLonInKm(churchLat, churchLong, position.coords.latitude, position.coords.longitude);

                //churchArray.push({name: churchName, distance: distance1});
                if(distance.toPrecision(4) < 25) {
                    $("#result_listNear").append("<a href='#' class='list-group-item'><b><h4>" + churchName + "</h4></b>" +
                    "<p><b>Distance:</b> " + distance.toPrecision(4) + "km</p>" + " </a>");
                }

            }

            /*$('.test').click(function() {
                getDetails2($(this).attr("id"));
            });*/

        });
    }

}

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1);
    var a =
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon/2) * Math.sin(dLon/2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI/180)
}

function clearWatch1() {
    if(watchID != null)
    {
        navigator.geolocation.clearWatch(watchID);
        watchID = null;
    }
}

function viewAllPictures() {
    if (window.XMLHttpRequest) {  // code for IE7+, Firefox, Chrome, Opera, Safari
        var xmlhttp = new XMLHttpRequest();
    }
    else {  // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.async = false;
    xmlhttp.open("GET", "http://www.churchfinderireland.com/getAllPictures.php", false);
    xmlhttp.send();
    var xmlDoc = xmlhttp.responseXML;

    var churchLength = xmlDoc.getElementsByTagName("Image").length;
    var images_array = [];

    for(i = 0; i < churchLength; i++) {
        var imageID = xmlDoc.getElementsByTagName("imageID")[i].childNodes[0].nodeValue;
        var churchID = xmlDoc.getElementsByTagName("churchID")[i].childNodes[0].nodeValue;
        var churchName = xmlDoc.getElementsByTagName("churchName")[i].childNodes[0].nodeValue;
        var filePath = xmlDoc.getElementsByTagName("filePath")[i].childNodes[0].nodeValue;
        images_array.push({href: filePath, title: churchName});
    }

    $.swipebox(images_array);
}
