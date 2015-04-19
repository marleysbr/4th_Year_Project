<?php
	
	header("Content-type: text/xml"); 
	header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS, REQUEST');
	
	$host = "31.220.17.87"; 
	$user = "marlan4t";
	$pass = "mar2014doso";
	$database = "marlan4t_churchFinder"; 
	
	$linkID = mysql_connect($host, $user, $pass) or die("Could not connect to host."); 
	mysql_select_db($database, $linkID) or die("Could not find database.");

	$username = $_GET['username'];
	$password = $_GET['password'];
	$email    = $_GET['email'];
	//" .$username. ", " .$password. ", " .$email. 
 	$sql = "INSERT INTO Users (username, password, email) VALUES ('$username' , '$password', '$email')";
		
	$resultID = mysql_query($sql, $linkID) or die("Data not found."); 
	
	$xml_output = "<?xml version=\"1.0\"?>\n"; 
	$xml_output .= "<Response>\n"; 
	
	if (!$resultID) {
		$xml_output .= "\t<Success>Failed</Success>\n";
	}
	else {
		$xml_output .= "\t<Success>Completed</Success>\n";
		
	}
	
	$xml_output .= "</Response>"; 
	
	echo $xml_output;

	$conn->close();

?>