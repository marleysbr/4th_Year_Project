var appomat = {};
var pictureSource;
var destinationType;

appomat.app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {
        FastClick.attach(document.body);
        pictureSource = navigator.camera.PictureSourceType;
        destinationType = navigator.camera.DestinationType;
    }

};

function showChurches() {

    var jqxhr = $.ajax({ url: "http://marlan4thyearproject.comli.com/showChurches.php" })
        .success(function(data) {
            document.getElementById("txtHint").innerHTML = data;
            console.log(JSON.parse((data)));
            alert("OK");
        })
        .error(function() {
            alert("error");
        })
        .complete(function() {});
}

function getChurches() {

    if (window.XMLHttpRequest) {  // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {  // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.async = false;
    xmlhttp.open("GET", "http://marlan4thyearproject.comli.com/xmlDatabase.php", false);
    xmlhttp.send();
    xmlDoc = xmlhttp.responseXML;

    churchLength = xmlDoc.getElementsByTagName("Church").length;

    for(i = 0; i < churchLength; i++) {

        churchID = xmlDoc.getElementsByTagName("id")[i].childNodes[0].nodeValue;
        churchName = xmlDoc.getElementsByTagName("name")[i].childNodes[0].nodeValue;
        churchCity = xmlDoc.getElementsByTagName("city")[i].childNodes[0].nodeValue;
        churchCounty = xmlDoc.getElementsByTagName("county")[i].childNodes[0].nodeValue;

        $("#result_list").append("<li id=" +churchID+ " class='test'><a href='#churchDetails'>" + churchName + " - " + churchCity +" (" + churchCounty + ")</a></li>");

        $("#result_list").listview("refresh");

    }

    $('.test').click(function() {
        getDetails($(this).attr("id"));
    });

}

function takePicture() {
    navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
        destinationType: Camera.DestinationType.FILE_URI });
}

function getPicture() {
    navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType : Camera.PictureSourceType.PHOTOLIBRARY });
}

function uploadImage(imageData) {
    var serverURL = "http://marlan4thyearproject.comli.com/uploadPicture.php";
    var options = new FileUploadOptions();
    options.fileKey = 'file';
    options.fileName = imageData.substr(imageData.lastIndexOf('/')+1);
    options.mimeType = "image/jpeg";

    var ft = new FileTransfer();
    ft.upload(imageData, serverURL, onUploadSuccess, onUploadFail, options);
}

function onUploadSuccess() {
    alert("Picture uploaded");
}

function onUploadFail() {
    alert("Picture Upload Failed");
}

function onSuccess(imageData) {
    var image = document.getElementById('camera_image');
    image.src = imageData;
    alert(image.src);
    uploadImage(imageData);

    server = "http://marlan4thyearproject.comli.com/uploadPicture.php";

}

function onFail(message) {
    alert('Failed because ' +message);
}

function getDetails(id) {

    if (window.XMLHttpRequest) {  // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {  // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.async = false;
    xmlhttp.open("GET", "http://marlan4thyearproject.comli.com/xmlChurch.php?id=" +id, false);
    xmlhttp.send();
    xmlDoc = xmlhttp.responseXML;

    churchID = xmlDoc.getElementsByTagName("id")[0].childNodes[0].nodeValue;
    churchName = xmlDoc.getElementsByTagName("name")[0].childNodes[0].nodeValue;
    churchAddress = xmlDoc.getElementsByTagName("address")[0].childNodes[0].nodeValue;
    churchCity = xmlDoc.getElementsByTagName("city")[0].childNodes[0].nodeValue;
    churchCounty = xmlDoc.getElementsByTagName("county")[0].childNodes[0].nodeValue;
    churchTelephone = xmlDoc.getElementsByTagName("telephone")[0].childNodes[0].nodeValue;
    churchCoordinates = xmlDoc.getElementsByTagName("coordinates")[0].childNodes[0].nodeValue;
    churchWeekdayMass = xmlDoc.getElementsByTagName("weekdayMass")[0].childNodes[0].nodeValue;
    churchWeekendMass = xmlDoc.getElementsByTagName("weekendMass")[0].childNodes[0].nodeValue;

    document.getElementById('churchName').innerHTML = churchName;
    document.getElementById('churchAddress').innerHTML = churchAddress;
    document.getElementById('churchCity').innerHTML = churchCity;
    document.getElementById('churchCounty').innerHTML = churchCounty;
    document.getElementById('churchTelephone').innerHTML = churchTelephone;
    document.getElementById('churchWeekdayMass').innerHTML = churchWeekdayMass;
    document.getElementById('churchWeekendMass').innerHTML = churchWeekendMass;

    churchLat = churchCoordinates.split(',')[0].split(' ').pop();
    churchLong = churchCoordinates.substr(churchCoordinates.indexOf(",") + 1);
    churchLong = churchLong.replace(/\s+/g, '');

    document.getElementById('changeCoordinates').innerHTML = '<button onclick="redirectToChurchMap();">Show on Map</button>';
}

function getDetailsFromMap(id) {

    if (window.XMLHttpRequest) {  // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {  // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.async = false;
    xmlhttp.open("GET", "http://marlan4thyearproject.comli.com/xmlChurch.php?id=" +id, false);
    xmlhttp.send();
    xmlDoc = xmlhttp.responseXML;

    churchID = xmlDoc.getElementsByTagName("id")[0].childNodes[0].nodeValue;
    churchName = xmlDoc.getElementsByTagName("name")[0].childNodes[0].nodeValue;
    churchAddress = xmlDoc.getElementsByTagName("address")[0].childNodes[0].nodeValue;
    churchCity = xmlDoc.getElementsByTagName("city")[0].childNodes[0].nodeValue;
    churchCounty = xmlDoc.getElementsByTagName("county")[0].childNodes[0].nodeValue;
    churchTelephone = xmlDoc.getElementsByTagName("telephone")[0].childNodes[0].nodeValue;
    churchCoordinates = xmlDoc.getElementsByTagName("coordinates")[0].childNodes[0].nodeValue;
    churchWeekdayMass = xmlDoc.getElementsByTagName("weekdayMass")[0].childNodes[0].nodeValue;
    churchWeekendMass = xmlDoc.getElementsByTagName("weekendMass")[0].childNodes[0].nodeValue;

    document.getElementById('churchName1').innerHTML = churchName;
    document.getElementById('churchAddress1').innerHTML = churchAddress;
    document.getElementById('churchCity1').innerHTML = churchCity;
    document.getElementById('churchCounty1').innerHTML = churchCounty;
    document.getElementById('churchTelephone1').innerHTML = churchTelephone;
    document.getElementById('churchWeekdayMass1').innerHTML = churchWeekdayMass;
    document.getElementById('churchWeekendMass1').innerHTML = churchWeekendMass;

    churchLat = churchCoordinates.split(',')[0].split(' ').pop();
    churchLong = churchCoordinates.substr(churchCoordinates.indexOf(",") + 1);
    churchLong = churchLong.replace(/\s+/g, '');

    document.getElementById('changeCoordinates').innerHTML = '<button onclick="redirectToChurchMap();">Show on Map</button>';
}



function getLocation() {
    navigator.geolocation.getCurrentPosition(showMap, onError, {enableHighAccuracy: true});
}

function showMap(position) {

    var myLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var mapOptions = {
        center: myLatLng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById("map_canvas"),mapOptions);

    google.maps.event.addListenerOnce(map, 'idle', function() {
        var center = map.getCenter();
        google.maps.event.trigger(map, 'resize');
        map.setCenter(center);
    });

    if (window.XMLHttpRequest) {  // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {  // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.async = false;
    xmlhttp.open("GET", "http://marlan4thyearproject.comli.com/xmlDatabase.php", false);
    xmlhttp.send();
    xmlDoc = xmlhttp.responseXML;

    churchLength = xmlDoc.getElementsByTagName("Church").length;

    for(i = 0; i < churchLength; i++) {
        churchID = xmlDoc.getElementsByTagName("id")[i].childNodes[0].nodeValue;
        churchName = xmlDoc.getElementsByTagName("name")[i].childNodes[0].nodeValue;
        churchCoords = xmlDoc.getElementsByTagName("coordinates")[i].childNodes[0].nodeValue;

        churchLat = churchCoords.split(',')[0].split(' ').pop();
        churchLong = churchCoords.substr(churchCoords.indexOf(",") + 1);
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

    var infowindow = new google.maps.InfoWindow({
        content: "You are here"
    });

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
        animation: google.maps.Animation.DROP,
        title: "You are here!"
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map,marker);
    });

}

var bindMarkerEvents = function(marker) {
    google.maps.event.addListener(marker, 'click', function() {
        window.location = "#churchDetailsFromMap";
        getDetailsFromMap(marker.get("id"));
    });
};

function onError(error) {
    alert('code: '    + error.code    + '\n' +
    'message: ' + error.message + '\n');
}

function redirectToChurchMap() {
    showMapChurch(churchLat, churchLong);
    window.location = "#mapWithChurch";
}

function showMapChurch(lat, long) {

    var myLatLng = new google.maps.LatLng(lat, long);

    var mapOptions = {
        center: myLatLng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById("map_canvas1"),mapOptions);

    google.maps.event.addListenerOnce(map, 'idle', function() {
        var center = map.getCenter();
        google.maps.event.trigger(map, 'resize');
        map.setCenter(center);
    });

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        animation: google.maps.Animation.DROP,
        title: "You are here!"
    });

    marker.setMap(map);
}

