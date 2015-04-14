<?php 

	header("Content-type: text/xml"); 

	$host = "mysql6.000webhost.com"; 
	$user = "a6222808_marleys"; 
	$pass = "mar2014doso"; 
	$database = "a6222808_church"; 

	$linkID = mysql_connect($host, $user, $pass) or die("Could not connect to host."); 
	mysql_select_db($database, $linkID) or die("Could not find database."); 

	$query = "SELECT * FROM Church ORDER BY churchID"; 
	$resultID = mysql_query($query, $linkID) or die("Data not found."); 

	$xml_output = "<?xml version=\"1.0\"?>\n";
	$xml_output .= "<Churches>\n"; 

	for($x = 0 ; $x < mysql_num_rows($resultID) ; $x++){ 
		$row = mysql_fetch_assoc($resultID); 
		$xml_output .= "\t<Church>\n"; 
		$xml_output .= "\t\t<id>" . $row['churchID'] . "</id>\n";
		$xml_output .= "\t\t<name>" . $row['name'] . "</name>\n"; 
		$xml_output .= "\t\t<address>" . $row['address'] . "</address>\n"; 
		$xml_output .= "\t\t<city>" . $row['city'] . "</city>\n"; 
		$xml_output .= "\t\t<county>" . $row['county'] . "</county>\n"; 
		$xml_output .= "\t\t<telephone>" . $row['telephone'] . "</telephone>\n"; 
		$xml_output .= "\t\t<coordinates>" . $row['coordinates'] . "</coordinates>\n"; 
		$xml_output .= "\t\t<weekdayMass>" . $row['weekdayMass'] . "</weekdayMass>\n"; 
		$xml_output .= "\t\t<weekendMass>" . $row['weekendMass'] . "</weekendMass>\n"; 
		$xml_output .= "\t</Church>\n"; 
	} 

	$xml_output .= "</Churches>"; 

	echo $xml_output; 

?>	