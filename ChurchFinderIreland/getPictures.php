<?php 

        header("Content-type: text/xml");

	$host = "mysql6.000webhost.com"; 
	$user = "a6222808_marleys"; 
	$pass = "mar2014doso"; 
	$database = "a6222808_church"; 

	$linkID = mysql_connect($host, $user, $pass) or die("Could not connect to host."); 
	mysql_select_db($database, $linkID) or die("Could not find database."); 

	$query = "SELECT * FROM ChurchImage WHERE churchID=".$_GET['id'];
	$resultID = mysql_query($query, $linkID) or die("Data not found."); 

	$xml_output = "<?xml version=\"1.0\"?>\n"; 
	$xml_output .= "<Images>\n"; 

	for($x = 0 ; $x < mysql_num_rows($resultID) ; $x++){ 
		$row = mysql_fetch_assoc($resultID); 
		$xml_output .= "\t<Image>\n"; 
		$xml_output .= "\t\t<imageID>" . $row['imageID'] . "</imageID>\n";
		$xml_output .= "\t\t<churchID>" . $row['churchID'] . "</churchID>\n"; 
		$xml_output .= "\t\t<filePath>" . $row['filePath'] . "</filePath>\n"; 
		$xml_output .= "\t</Image>\n"; 
	} 

	$xml_output .= "</Images>"; 
         
	echo $xml_output; 
    //exit();
?>	