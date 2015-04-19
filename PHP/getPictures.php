<?php 

        header("Content-type: text/xml");

	$host = "31.220.17.87"; 
	$user = "marlan4t";
	$pass = "mar2014doso";
	$database = "marlan4t_churchFinder"; 

	$linkID = mysql_connect($host, $user, $pass) or die("Could not connect to host."); 
	mysql_select_db($database, $linkID) or die("Could not find database."); 

	$query = "SELECT ChurchImage.imageID, ChurchImage.churchID, ChurchImage.filePath, Church.name FROM ChurchImage INNER JOIN Church ON ChurchImage.churchID = Church.churchID WHERE ChurchImage.churchID=" .$_GET['id'];

	$resultID = mysql_query($query, $linkID) or die("Data not found."); 

	$xml_output = "<?xml version=\"1.0\"?>\n"; 
	$xml_output .= "<Images>\n"; 

	for($x = 0 ; $x < mysql_num_rows($resultID) ; $x++){ 
		$row = mysql_fetch_assoc($resultID); 
		$xml_output .= "\t<Image>\n"; 
		$xml_output .= "\t\t<imageID>" . $row['imageID'] . "</imageID>\n";
		$xml_output .= "\t\t<churchID>" . $row['churchID'] . "</churchID>\n"; 
                $xml_output .= "\t\t<churchName>" . $row['name'] . "</churchName>\n"; 
		$xml_output .= "\t\t<filePath>" . $row['filePath'] . "</filePath>\n"; 
		$xml_output .= "\t</Image>\n"; 
	} 

	$xml_output .= "</Images>"; 
         
	echo $xml_output; 
        //exit();
?>	