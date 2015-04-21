<?php

	print_r($_FILES);
	move_uploaded_file($_FILES["file"]["tmp_name"], "images/".$_FILES["file"]["name"]);
	
	$host = "31.220.17.87"; 
	$user = "marlan4t";
	$pass = "mar2014doso";
	$database = "marlan4t_churchFinder"; 

	$linkID = mysql_connect($host, $user, $pass) or die("Could not connect to host."); 
	mysql_select_db($database, $linkID) or die("Could not find database."); 

	
		 
		$file = "http://www.churchfinderireland.com/images/".$_FILES["file"]["name"];
		$churchID = $_REQUEST['id'];

		$sql="INSERT INTO ChurchImage(imageID, churchID, filePath) VALUES (DEFAULT,'$churchID','$file')";

		if (!mysql_query($sql))
		{
			die('Error: ' . mysql_error());
		}
	

?>	