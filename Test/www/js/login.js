function checkPreAuth() {
    var form = document.loginForm;
    if(window.localStorage["username"] != undefined && window.localStorage["password"] != undefined) {
        document.getElementById("username").value = window.localStorage["username"];
        document.getElementById("password").value = window.localStorage["password"];
        if( logIn() == true) {
            document.location.href = "index.html";
        }
        else {
            alert("Login Error - Check Details and try again");
        }
    }
}

function logIn() {

    var un = document.loginForm.username.value;
    var pw = document.loginForm.password.value;

    if (window.XMLHttpRequest) {  // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {  // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.async = false;
    xmlhttp.open("GET", "http://www.churchfinderireland.com/login.php?username=" +un+ "&password=" +pw, false);
    xmlhttp.send();
    xmlDoc = xmlhttp.responseXML;

    userLength = xmlDoc.getElementsByTagName("Details").length;

    if(userLength == 1) {
        username1 = xmlDoc.getElementsByTagName("username")[0].childNodes[0].nodeValue;
        password1 = xmlDoc.getElementsByTagName("password")[0].childNodes[0].nodeValue;

        if(un == username1 && pw == password1) {
            //alert("Logging in...");

            window.localStorage["username"] = un;
            window.localStorage["password"] = pw;
            document.loginForm.action = "index.html";
            return true;
        }
        else {
            alert("Error...");
        }
    }
    else {
        alert("Login Error - Check Details and try again");
    }
}

function register() {
    alert("Being developed ...");
}