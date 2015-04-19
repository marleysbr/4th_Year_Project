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