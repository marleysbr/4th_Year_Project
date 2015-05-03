var appomat = {};
var pictureSource;
var destinationType;
var watchID = null;
var directionsDisplay;
var directionsService;

//Add Listeners when Cordova API's are loaded
appomat.app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('deviceready', calendar_events, false);
        document.addEventListener("backbutton", onBackKeyDown, false);

    },

    onDeviceReady: function() {
        pictureSource = navigator.camera.PictureSourceType;
        destinationType = navigator.camera.DestinationType;
    }

};

//Prevents the user from using the Back button
function onBackKeyDown(e) {
    e.preventDefault();
}

//Function to exit the app
function exitFromApp() {
    navigator.app.exitApp();
}

//Function to log the user out of the app
function logOut() {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    document.location.href = "login.html";
}

/* ----------------------------------------------------------- Church Functions ----------------------------------------------------------- */

//This function will get ALL churches in the Database
function getChurches() {
    //Call to plugin to display a Toast notification
    window.plugins.toast.showShortBottom('Loading results...',
        function(a){
            console.log('toast success: ' + a)
        },
        function(b){
            alert('toast error: ' + b)
        });

    //XML Request to Server to request a XML document
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.async = false;
    xmlhttp.open("GET", "http://www.churchfinderireland.com/xmlDatabase.php", false);
    xmlhttp.send();
    xmlDoc = xmlhttp.responseXML;

    churchLength = xmlDoc.getElementsByTagName("Church").length;

    //For each result inside a Church tag, an item in the list will be created
    for(i = 0; i < churchLength; i++) {

        churchID = xmlDoc.getElementsByTagName("id")[i].childNodes[0].nodeValue;
        churchName = xmlDoc.getElementsByTagName("name")[i].childNodes[0].nodeValue;
        churchCity = xmlDoc.getElementsByTagName("city")[i].childNodes[0].nodeValue;
        churchCounty = xmlDoc.getElementsByTagName("county")[i].childNodes[0].nodeValue;

        $("#result_list").append("<li id=" +churchID+ " class='test'><a href='#churchDetails'><h3>" + churchName + "</h3> <p><b>- City:</b> " + churchCity +" &nbsp;  &nbsp; <b>- County: </b>" + churchCounty + " </p> </a></li>");

        $("#result_list").listview("refresh");

    }

    //Add Click function to each item in the list
    $('.test').click(function() {
        getDetails($(this).attr("id"));
    });
}

//Get new Churches with value from Slider
function getNearMass(value) {
    //Display Toast while loading results
    window.plugins.toast.showShortBottom('Loading results...',
        function(a){
            console.log('toast success: ' + a)
        },
        function(b){
            alert('toast error: ' + b)
        });

    $('#result_listNear').empty(); //Clears the List every time the user enters the page

    //Get the user's location
    watchID = navigator.geolocation.watchPosition(function a(position) {

        var myLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        }
        else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.async = false;
        xmlhttp.open("GET", "http://www.churchfinderireland.com/xmlDatabase.php", false);
        xmlhttp.send();
        xmlDoc = xmlhttp.responseXML;

        churchLength = xmlDoc.getElementsByTagName("Church").length;

        //For every entry in the XML document, add the entry to the List
        for(i = 0; i < churchLength; i++) {

            churchID = xmlDoc.getElementsByTagName("id")[i].childNodes[0].nodeValue;
            churchName = xmlDoc.getElementsByTagName("name")[i].childNodes[0].nodeValue;
            churchCity = xmlDoc.getElementsByTagName("city")[i].childNodes[0].nodeValue;
            churchCounty = xmlDoc.getElementsByTagName("county")[i].childNodes[0].nodeValue;

            churchCoordinates = xmlDoc.getElementsByTagName("coordinates")[i].childNodes[0].nodeValue;
            churchLat = churchCoordinates.split(',')[0].split(' ').pop();
            churchLong = churchCoordinates.substr(churchCoordinates.indexOf(",") + 1);
            churchLong = churchLong.replace(/\s+/g, '');

            //Get the distance between the user's location and the Church's location
            var distance = getDistanceFromLatLonInKm(churchLat, churchLong, myLatLng.lat(), myLatLng.lng());

            $("#result_listNear").append("<li id=" +distance.toPrecision(4)+ " ><a class='test' id="+churchID+" href='#pagePanel'><h3>" + churchName + "</h3>" +
                "<p><b>Distance:</b> " + distance.toPrecision(4) + "km</p>" + " </a></li>");

            $("#result_listNear").listview("refresh");

        }

        //Make the JQuery list ordered by distance
        var newValue = value * 1;

        var listItems = $('#result_listNear').children('li').remove();
        listItems.each(function() {
            if(this.id <= newValue) {
                $('#result_listNear').append(this);
            }
        });

        var elems = $('#result_listNear').children('li').remove();
        elems.sort(function(a,b){
            return parseInt(a.id) > parseInt(b.id);
        });
        $('#result_listNear').append(elems);

        //Make each element in the list clickable
        $('.test').click(function() {
            getDetails2($(this).attr("id"));
        });

        navigator.geolocation.clearWatch(watchID);
        watchID = null;

    }, onError, {enableHighAccuracy: true});

}

/* ----------------------------------------------------------- Details Functions ----------------------------------------------------------- */

//Get details of a Church through a XML request to my Database
function getDetails(id) {
    //Display Toast Message while loading the details
    window.plugins.toast.showShortBottom('Loading ...',
        function(a){
            console.log('toast success: ' + a)
        },
        function(b){
            alert('toast error: ' + b)
        });

    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.async = false;
    xmlhttp.open("GET", "http://www.churchfinderireland.com/xmlChurch.php?id=" +id, false);
    xmlhttp.send();
    xmlDoc = xmlhttp.responseXML;

    //Get each tag and store the value in the DOM of the page
    churchID = xmlDoc.getElementsByTagName("id")[0].childNodes[0].nodeValue;
    churchName = xmlDoc.getElementsByTagName("name")[0].childNodes[0].nodeValue;
    churchAddress = xmlDoc.getElementsByTagName("address")[0].childNodes[0].nodeValue;
    churchCity = xmlDoc.getElementsByTagName("city")[0].childNodes[0].nodeValue;
    churchCounty = xmlDoc.getElementsByTagName("county")[0].childNodes[0].nodeValue;
    churchTelephone = xmlDoc.getElementsByTagName("telephone")[0].childNodes[0].nodeValue;
    churchTelephone.replace(/\s+/g, '');
    churchCoordinates = xmlDoc.getElementsByTagName("coordinates")[0].childNodes[0].nodeValue;
    churchWeekdayMass = xmlDoc.getElementsByTagName("weekdayMass")[0].childNodes[0].nodeValue;
    churchWeekendMass = xmlDoc.getElementsByTagName("weekendMass")[0].childNodes[0].nodeValue;

    //Add the values to the HTML and display it to the user
    document.getElementById('churchName').innerHTML = churchName;
    document.getElementById('churchAddress').innerHTML = "<strong>Address:</strong> " + churchAddress;
    document.getElementById('churchCity').innerHTML = "<strong>City:</strong> " + churchCity;
    document.getElementById('churchCounty').innerHTML = "<strong>County:</strong> " + churchCounty;
    document.getElementById('churchTelephone').innerHTML = "<strong>Telephone:</strong> " + " <a href=tel:"+ churchTelephone +"> "+ churchTelephone + "</a>" ;
    document.getElementById('churchWeekdayMass').innerHTML = "<strong>Weekday Mass:</strong> " + churchWeekdayMass;
    document.getElementById('churchWeekendMass').innerHTML = "<strong>Weekend Mass:</strong> " + churchWeekendMass;

    //Split the coordinates to remove the "," to find the Church in the map
    churchLat = churchCoordinates.split(',')[0].split(' ').pop();
    churchLong = churchCoordinates.substr(churchCoordinates.indexOf(",") + 1);
    churchLong = churchLong.replace(/\s+/g, '');

    // Get Background Image through a XML request
    if (window.XMLHttpRequest) {
        xmlhttp1 = new XMLHttpRequest();
    }
    else {
        xmlhttp1 = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp1.async = false;
    xmlhttp1.open("GET", "http://www.churchfinderireland.com/getPictures.php?id=" +churchID, false);
    xmlhttp1.send();
    xmlDoc1 = xmlhttp1.responseXML;

    churchLength1 = xmlDoc1.getElementsByTagName("Image").length;

    //If there's a picture in the Database for the Church add it to the background, otherwise use the default picture
    if(churchLength1 >= 1) {
        filePath = xmlDoc1.getElementsByTagName("filePath")[0].childNodes[0].nodeValue;
        document.getElementById("myDiv").style.backgroundImage = "url('"+filePath+"')";
    }
    else if (churchLength1 == 0) {
        document.getElementById("myDiv").style.backgroundImage = "url('img/defaultbackground.png')";
    }

}

//Get details of the Church when click a marker in the Map
function getDetailsFromMap(id) {
    //Display Toast message while laoding details
    window.plugins.toast.showShortBottom('Loading ...',
        function(a){
            console.log('toast success: ' + a)
        },
        function(b){
            alert('toast error: ' + b)
        });

    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.async = false;
    xmlhttp.open("GET", "http://www.churchfinderireland.com/xmlChurch.php?id=" +id, false);
    xmlhttp.send();
    xmlDoc = xmlhttp.responseXML;

    //Get each tag and store the value in the DOM of the page
    churchID = xmlDoc.getElementsByTagName("id")[0].childNodes[0].nodeValue;
    churchName = xmlDoc.getElementsByTagName("name")[0].childNodes[0].nodeValue;
    churchAddress = xmlDoc.getElementsByTagName("address")[0].childNodes[0].nodeValue;
    churchCity = xmlDoc.getElementsByTagName("city")[0].childNodes[0].nodeValue;
    churchCounty = xmlDoc.getElementsByTagName("county")[0].childNodes[0].nodeValue;
    churchTelephone = xmlDoc.getElementsByTagName("telephone")[0].childNodes[0].nodeValue;
    churchCoordinates = xmlDoc.getElementsByTagName("coordinates")[0].childNodes[0].nodeValue;
    churchWeekdayMass = xmlDoc.getElementsByTagName("weekdayMass")[0].childNodes[0].nodeValue;
    churchWeekendMass = xmlDoc.getElementsByTagName("weekendMass")[0].childNodes[0].nodeValue;

    //Add the values to the HTML and display it to the user
    document.getElementById('churchName1').innerHTML = churchName;
    document.getElementById('churchAddress1').innerHTML = "<strong>Address:</strong> " + churchAddress;
    document.getElementById('churchCity1').innerHTML = "<strong>City:</strong> " + churchCity;
    document.getElementById('churchCounty1').innerHTML = "<strong>County:</strong> " + churchCounty;
    document.getElementById('churchTelephone1').innerHTML = "<strong>Telephone:</strong> " + " <a href=tel:"+ churchTelephone +"> "+ churchTelephone + "</a>" ;
    document.getElementById('churchWeekdayMass1').innerHTML = "<strong>Weekday Mass:</strong> " + churchWeekdayMass;
    document.getElementById('churchWeekendMass1').innerHTML = "<strong>Weekend Mass:</strong> " + churchWeekendMass;

    //Split the coordinates to remove the "," to find the Church in the map
    churchLat = churchCoordinates.split(',')[0].split(' ').pop();
    churchLong = churchCoordinates.substr(churchCoordinates.indexOf(",") + 1);
    churchLong = churchLong.replace(/\s+/g, '');

    // Get Background Image through a XML request
    if (window.XMLHttpRequest) {
        xmlhttp1 = new XMLHttpRequest();
    }
    else {
        xmlhttp1 = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp1.async = false;
    xmlhttp1.open("GET", "http://www.churchfinderireland.com/getPictures.php?id=" +churchID, false);
    xmlhttp1.send();
    xmlDoc1 = xmlhttp1.responseXML;

    churchLength1 = xmlDoc1.getElementsByTagName("Image").length;

    //If there's a picture in the Database for the Church add it to the background, otherwise use the default picture
    if(churchLength1 >= 1) {
        filePath = xmlDoc1.getElementsByTagName("filePath")[0].childNodes[0].nodeValue;
        document.getElementById("myDiv1").style.backgroundImage = "url('"+filePath+"')";
    }
    else if (churchLength1 == 0) {
        document.getElementById("myDiv1").style.backgroundImage = "url('img/defaultbackground.png')";
    }

}

//Get details of a Church from the Near You page and adding it to a JQuery Panel
function getDetails2(id) {
    //Display Toast while loading details
    window.plugins.toast.showShortBottom('Loading ...',
        function(a){
            console.log('toast success: ' + a)
        },
        function(b){
            alert('toast error: ' + b)
        });

    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.async = false;
    xmlhttp.open("GET", "http://www.churchfinderireland.com/xmlChurch.php?id=" +id, false);
    xmlhttp.send();
    xmlDoc = xmlhttp.responseXML;

    churchID = xmlDoc.getElementsByTagName("id")[0].childNodes[0].nodeValue;
    churchName = xmlDoc.getElementsByTagName("name")[0].childNodes[0].nodeValue;
    churchAddress = xmlDoc.getElementsByTagName("address")[0].childNodes[0].nodeValue;
    churchCity = xmlDoc.getElementsByTagName("city")[0].childNodes[0].nodeValue;
    churchCounty = xmlDoc.getElementsByTagName("county")[0].childNodes[0].nodeValue;
    churchTelephone = xmlDoc.getElementsByTagName("telephone")[0].childNodes[0].nodeValue;

    churchTelephone.replace(/\s+/g, '');

    churchCoordinates = xmlDoc.getElementsByTagName("coordinates")[0].childNodes[0].nodeValue;
    churchWeekdayMass = xmlDoc.getElementsByTagName("weekdayMass")[0].childNodes[0].nodeValue;
    churchWeekendMass = xmlDoc.getElementsByTagName("weekendMass")[0].childNodes[0].nodeValue;

    document.getElementById('churchName2').innerHTML = churchName;
    document.getElementById('churchAddress2').innerHTML = "<strong>Address:</strong> " + churchAddress;
    document.getElementById('churchCity2').innerHTML = "<strong>City:</strong> " + churchCity;
    document.getElementById('churchCounty2').innerHTML = "<strong>County:</strong> " + churchCounty;
    document.getElementById('churchTelephone2').innerHTML = "<strong>Telephone:</strong> " + " <a href=tel:"+ churchTelephone +"> "+ churchTelephone + "</a>" ;
    document.getElementById('churchWeekdayMass2').innerHTML = "<strong>Weekday Mass:</strong> " + churchWeekdayMass;
    document.getElementById('churchWeekendMass2').innerHTML = "<strong>Weekend Mass:</strong> " + churchWeekendMass;

    churchLat = churchCoordinates.split(',')[0].split(' ').pop();
    churchLong = churchCoordinates.substr(churchCoordinates.indexOf(",") + 1);
    churchLong = churchLong.replace(/\s+/g, '');
}

/* ----------------------------------------------------------- Map Functions ----------------------------------------------------------- */

//Get the user's location and load the map when location is found
function getLocation() {
    //Display Toast while finding Location
    window.plugins.toast.showShortBottom('Loading map...',
        function(a){
            console.log('toast success: ' + a)
        },
        function(b){
            alert('toast error: ' + b)
        });
    watchID = navigator.geolocation.getCurrentPosition(showMap, onError, {enableHighAccuracy: true});
}

//Show map when location is found
function showMap(position) {
    //Store user's coordinates in the DOM
    var myLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var mapOptions = {
        center: myLatLng, //Center the map in the user's location
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById("map_canvas"),mapOptions); //add the map to the HTML page

    //Prevents the map from displaying before it's fully loaded
    google.maps.event.addListenerOnce(map, 'idle', function() {
        var center = map.getCenter();
        google.maps.event.trigger(map, 'resize');
        map.setCenter(center);
    });

    //XML request to get all Churches in Database
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.async = false;
    xmlhttp.open("GET", "http://www.churchfinderireland.com/xmlDatabase.php", false);
    xmlhttp.send();
    xmlDoc = xmlhttp.responseXML;

    churchLength = xmlDoc.getElementsByTagName("Church").length;

    //For each entry in the XML document, add a Marker to the map
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

        markerChurches.set("id", churchID); //Add ID of the Church to Marker

        bindMarkerEvents(markerChurches); //Make Marker clickable

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

//Get Details of the Church from clicking a Marker
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

//Redirect to the Map page containing directions to the selected Church
function redirectToChurchMap() {
    showMapChurch(churchLat, churchLong);
    window.location = "#mapWithChurch";
}

//Display Map with directions from the user's location to the Church's location
function showMapChurch(lat, long) {
    directionsDisplay = new google.maps.DirectionsRenderer(); //Create a new DirectionsRenderer object (lines in map)
    directionsService = new google.maps.DirectionsService(); //Create a new DirectionsService object (directions)

    var myLatLng = new google.maps.LatLng(lat, long); //Store the Church's location in the DOM

    var mapOptions = {
        center: myLatLng, //Center the Map in the Church's location
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById("map_canvas1"),mapOptions); //Add the map to the HTML page
    directionsDisplay.setMap(map);

    //Prevents the map from displaying before it's fully loaded
    google.maps.event.addListenerOnce(map, 'idle', function() {
        var center = map.getCenter();
        google.maps.event.trigger(map, 'resize');
        map.setCenter(center);
    });

    //Add Church's location (marker) to map
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        animation: google.maps.Animation.DROP,
        title: "Church's Location"
    });

    var myLatLng1;
    var marker1;
    var request;

    //Get your location and add a Marker to the map
    navigator.geolocation.getCurrentPosition(function putMarker(position) {
        myLatLng1 = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        marker1 = new google.maps.Marker({
            position: myLatLng1,
            map: map,
            icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
            animation: google.maps.Animation.DROP,
            title: "You are here!"
        });
    }, onError, {enableHighAccuracy: true});

    navigator.geolocation.watchPosition( //Watches your position to get your new location every second
        function (position) {
            setMarkerPosition(
                marker1, position, map
            );
        }, onError, {enableHighAccuracy: true});

    function setMarkerPosition(marker1, position, map) { //Once position is changed, move marker to new position and center map
        marker1.setPosition(new google.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude));

        google.maps.event.addListener(marker1, "position_changed", function() {
            map.panTo(new google.maps.LatLng(
                position.coords.latitude,
                position.coords.longitude));
        });

        myLatLng1 = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        request = {
            origin:myLatLng1,
            destination:myLatLng,
            travelMode: google.maps.TravelMode.DRIVING
        };
        directionsService.route(request, function(response, status) { //Get a new route every time your position is changed
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setOptions({ preserveViewport: true });
                directionsDisplay.setDirections(response);
            }

            google.maps.event.addListener(directionsDisplay, 'directions_changed', function() {

            });
        });

    }
}

function clearWatch1() {
    if(watchID != null)
    {
        navigator.geolocation.clearWatch(watchID);
        watchID = null;
    }
}

/* ----------------------------------------------------------- Picture Functions ----------------------------------------------------------- */

//Take a picture using the Camera
function takePicture() {
    navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType : Camera.PictureSourceType.CAMERA });
}

//Take a picture using the Gallery
function getPicture() {
    navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType : Camera.PictureSourceType.PHOTOLIBRARY });
}

function onSuccess(imageData) {
    uploadImage(imageData);
}

function onFail(message) {
    alert('Failed because ' +message);
}

//Upload the picture to the server using the picture location
function uploadImage(imageData) {
    var serverURL = "http://www.churchfinderireland.com/uploadPicture.php?id=" +churchID;
    var options = new FileUploadOptions();
    options.fileKey = 'file';
    options.fileName = imageData.substr(imageData.lastIndexOf('/')+1);
    options.mimeType = "image/jpeg";

    //Create a new instance of FileTransfer and upload it to the server
    var ft = new FileTransfer();
    ft.upload(imageData, serverURL, onUploadSuccess, onUploadFail, options);
}

function onUploadSuccess() {
    alert("Picture uploaded");
}

function onUploadFail() {
    alert("Picture Upload Failed");
}

//See pictures of a Church inside the server through an XML request
function viewUploadedPictures() {
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.async = false;
    xmlhttp.open("GET", "http://www.churchfinderireland.com/getPictures.php?id=" +churchID, false);
    xmlhttp.send();
    xmlDoc = xmlhttp.responseXML;

    churchLength = xmlDoc.getElementsByTagName("Image").length;
    images_array = [];

    for(i = 0; i < churchLength; i++) {
        imageID = xmlDoc.getElementsByTagName("imageID")[i].childNodes[0].nodeValue;
        churchID = xmlDoc.getElementsByTagName("churchID")[i].childNodes[0].nodeValue;
        churchName = xmlDoc.getElementsByTagName("churchName")[i].childNodes[0].nodeValue;
        filePath = xmlDoc.getElementsByTagName("filePath")[i].childNodes[0].nodeValue;
        images_array.push({href: filePath, title: churchName}); //Add each entry in the XML document to the array
    }

    $.swipebox(images_array); //Display the array of pictures using the SwipeBox API
}

//Get all pictures inside the Database
function getAllPictures() {
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.async = false;
    xmlhttp.open("GET", "http://www.churchfinderireland.com/getAllPictures.php", false);
    xmlhttp.send();
    xmlDoc = xmlhttp.responseXML;

    churchLength = xmlDoc.getElementsByTagName("Image").length;
    images_array = [];

    for(i = 0; i < churchLength; i++) {
        imageID = xmlDoc.getElementsByTagName("imageID")[i].childNodes[0].nodeValue;
        churchID = xmlDoc.getElementsByTagName("churchID")[i].childNodes[0].nodeValue;
        churchName = xmlDoc.getElementsByTagName("churchName")[i].childNodes[0].nodeValue;
        filePath = xmlDoc.getElementsByTagName("filePath")[i].childNodes[0].nodeValue;
        images_array.push({href: filePath, title: churchName}); //Add each entry in the XML document to the array
    }

    $.swipebox(images_array); //Display the array of pictures using the SwipeBox API
}

/* ----------------------------------------------------------- Miscellaneous Functions ----------------------------------------------------------- */

//Function to calculate the distance between two coordinates - as the crow flies distance
//Reference - Author: http://www.movable-type.co.uk/scripts/latlong.html
function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1);  // deg2rad below
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


//Add an Event to the Calendar using the Calendar plugin
function calendar_events(){

    var loc = document.getElementById("churchName2").innerHTML
    var add = document.getElementById("churchAddress2").innerHTML.slice(26)+ ", " +document.getElementById('churchCity2').innerHTML.slice(23)
        + ", " +document.getElementById('churchCounty2').innerHTML.slice(25);

    var todaysDate = new Date();
    var year = todaysDate.getFullYear();
    var month = todaysDate.getMonth();
    var day = todaysDate.getDate();
    var hour = todaysDate.getHours();
    var mins = todaysDate.getMinutes();

    var startDate = new Date(year,month,day,hour,mins,0,0);
    var endDate = new Date(year,month,day,hour,mins,0,0);
    var title = "Mass @ " + loc;
    var location = add;
    var notes = "Mass alert!";
    var success = function(message) { alert("Success: Calendar Event Created" ); };
    var error = function(message) { alert("Error: " + message); };

    window.plugins.calendar.createEventInteractively(title,location,notes,startDate,endDate,success,error);

}
