//Check if the User is logged in by comparing the stored Values against the Database values
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

//Get the values from the TextFields, open a connection to the server and compare the values
function logIn() {
    var un = document.loginForm.username.value;
    var pw = document.loginForm.password.value;

    if(un != "" && pw != "") {
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        }
        else {
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

            //Store the user details in the Local HTML 5 Database
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

//Register the user
function register() {

    var un = document.loginForm.username.value;
    var pw = document.loginForm.password.value;
    var pwc = document.loginForm.passwordConfirmation.value;
    var em = document.loginForm.email.value;

    if(un != "" && pw != "" && pwc != "" && em != "") {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i; //Check if email is in right format
        if(re.test(em) == true) {
            if (pw == pwc && pw.length >= 4) {
                var data = "username=" + un + "&password=" + pw + "&email=" + em;

                if (window.XMLHttpRequest) {
                    xmlhttp = new XMLHttpRequest();
                }
                else {
                    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                }

                xmlhttp.async = false;
                xmlhttp.open("GET", "http://www.churchfinderireland.com/register.php?" + data, false);
                xmlhttp.send(data);
                xmlDoc = xmlhttp.responseXML;

                regDetail = xmlDoc.getElementsByTagName("Response").length;

                if (regDetail == 1) {
                    regState = xmlDoc.getElementsByTagName("Success")[0].childNodes[0].nodeValue;

                    //If registration is successful, details are store in the HTML 5 Local Database
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