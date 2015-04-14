<?php

	print_r($_FILES);
	move_uploaded_file($_FILES["file"]["tmp_name"], "images/".$_FILES["file"]["name"]);
	
	$host = "mysql6.000webhost.com"; 
	$user = "a6222808_marleys"; 
	$pass = "mar2014doso"; 
	$database = "a6222808_church"; 

	$linkID = mysql_connect($host, $user, $pass) or die("Could not connect to host."); 
	mysql_select_db($database, $linkID) or die("Could not find database."); 

	$file = "http://marlan4thyearproject.comli.com/images/".$_FILES["file"]["name"];
	$churchID = $_REQUEST['id'];

	$sql="INSERT INTO ChurchImage(imageID, churchID, filePath) VALUES (DEFAULT,'$churchID','$file')";

	if (!mysql_query($sql))
	{
		die('Error: ' . mysql_error());
	}

?>	