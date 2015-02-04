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

function showUser() {
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            document.getElementById("txtHint").innerHTML = xmlhttp.responseText;
        }
    }
    xmlhttp.open("GET","http://marlan4thyearproject.comli.com/getChurches.php",true);
    xmlhttp.send();
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

