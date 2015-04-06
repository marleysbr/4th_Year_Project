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

    if(un != "" && pw != "") {
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
                window.localStorage["username"] = un;
                window.localStorage["password"] = pw;
                document.location.href = "index.html";
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
    else {
        alert ("Enter all fields");
    }


}

function register() {

    var un = document.loginForm.username.value;
    var pw = document.loginForm.password.value;
    var pwc = document.loginForm.passwordConfirmation.value;
    var em = document.loginForm.email.value;

    if(un != "" && pw != "" && pwc != "" && em != "") {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        if(re.test(em) == true) {
            if (pw == pwc && pw.length >= 4) {
                var data = "username=" + un + "&password=" + pw + "&email=" + em;

                if (window.XMLHttpRequest) {  // code for IE7+, Firefox, Chrome, Opera, Safari
                    xmlhttp = new XMLHttpRequest();
                }
                else {  // code for IE6, IE5
                    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                }

                xmlhttp.async = false;
                xmlhttp.open("GET", "http://www.churchfinderireland.com/register.php?" + data, false);
                xmlhttp.send(data);
                xmlDoc = xmlhttp.responseXML;

                regDetail = xmlDoc.getElementsByTagName("Response").length;

                if (regDetail == 1) {
                    regState = xmlDoc.getElementsByTagName("Success")[0].childNodes[0].nodeValue;

                    if (regState == "Completed") {
                        window.localStorage["username"] = un;
                        window.localStorage["password"] = pw;
                        document.location.href = "index.html";
                    }
                    else {
                        alert("Registration Failed - Try again");
                    }
                }
                else {
                    alert("Registration Failed - Try again");
                }
            }
            else {
                alert("Passwords do not match - Try again");
            }
        }
        else {
            alert("Wrong email format - Try again");
        }
    }
    else {
        alert ("Enter all fields");
    }
}