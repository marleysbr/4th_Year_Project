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

function takePicture() {
    navigator.camera.getPicture(
        function(uri) {
            var img = document.getElementById('camera_image');
            img.style.visibility = "visible";
            img.style.display = "block";
            img.src = uri;
            document.getElementById('camera_status').innerHTML = "Success";
        }, function(e) {
            console.log("Error getting picture: " + e);
            document.getElementById('camera_status').innerHTML = "Error getting picture."; },
        { quality: 50, destinationType: navigator.camera.DestinationType.FILE_URI, correctOrientation: true});
};

function useExistingPhoto() {
    navigator.camera.getPicture(
        function(uri) {
            var img = document.getElementById('camera_image');
            img.style.visibility = "visible";
            img.style.display = "block";
            img.src = uri;
            document.getElementById('camera_status').innerHTML = "Success";
        }, function(e) {
            console.log("Error getting picture: " + e);
            document.getElementById('camera_status').innerHTML = "Error getting picture."; },
    { quality: 50, destinationType: navigator.camera.DestinationType.FILE_URI, sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY} );
};

function uploadPicture() {
    var img = document.getElementById('camera_image');
    var imageURI = img.src;
    if (!imageURI || (img.style.display == "none")) {
        document.getElementById('camera_status').innerHTML = "Take picture or select picture from library first.";
        return;
    }

    document.getElementById('camera_status').innerHTML = "Uploading...";

    var server = "http://marlan4thyearproject.comli.com/uploadPicture.php";
    if (server) {
        var options = new FileUploadOptions();
            options.fileKey="file";
            options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
            options.mimeType="image/jpeg";
            options.chunkedMode = false;

            var ft = new FileTransfer();
            ft.upload(imageURI, server, function(r) {
                document.getElementById('camera_status').innerHTML = "Upload successful: "+ r.bytesSent+" bytes uploaded.";
            }, function(error) {
                document.getElementById('camera_status').innerHTML = "Upload failed: Code = "+ error.code;
            }, options);
    }
}

function viewUploadedPictures() {
    var server = "http://marlan4thyearproject.comli.com/uploadPicture.php";
    if (server)
    {
    var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange=function(){ if(xmlhttp.readyState === 4){
            if (xmlhttp.status === 200) {
                document.getElementById('server_images').innerHTML = xmlhttp.responseText;
            }
            else {
                document.getElementById('server_images').innerHTML = "Error retrieving pictures from server.";
            }            }
        };
        xmlhttp.open("GET", server , true);
        xmlhttp.send();
    }
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

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        animation: google.maps.Animation.DROP,
        title: "You are here!"
    });
    marker.setMap(map);
}


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

