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

        var client = new WindowsAzure.MobileServiceClient('https://marleystestproject.azure-mobile.net/', 'MqLCLoCvUPrfjwWBclEQzUaemoqXlh74');

        var itemTable = client.getTable('Item');

        itemTable.insert("Test");
    }
};

function useExistingPhoto() {
    this.capture(Camera.PictureSourceType.SAVEDPHOTOALBUM);
}

function takePicture() {
    this.capture(Camera.PictureSourceType.CAMERA);
}

function onPhotoFileSuccess(imageData) {

    var fail, ft, options, params, win;
    // callback for when the photo has been successfully uploaded:
    function success(response) {
        alert("Your photo has been uploaded!");
    };
    // callback if the photo fails to upload successfully.
    function fail(error) {
        alert("An error has occurred: Code = " + error.code);
    };
    options = new FileUploadOptions();
    // parameter name of file:
    options.fileKey = "my_image";
    // name of the file:
    options.fileName = imageData.substr(imageData.lastIndexOf('/') + 1);
    // mime type:
    options.mimeType = "text/plain";
    params = {
        val1: "some value",
        val2: "some other value"
    };
    options.params = params;
    ft = new FileTransfer();
    ft.upload(imageURI, 'mbourz05vp.database.windows.net,1433', success, fail, options);

    console.log(JSON.stringify(imageData));
    var smallImage = document.getElementById('smallImage');
    smallImage.style.display = block;
    smallImage.src = imageData;
}

function onFail(message){
    alert('Failed because: ' +message);
}

function capture(sourceType) {
   navigator.camera.getPicture(onPhotoFileSuccess, onFail,
       {
           quality: 50,
           destinationType: Camera.DestinationType.FILE_URI,
           sourceType: sourceType,
           correctOrientation: true
       });
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

