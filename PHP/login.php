<?php
	
	header("Content-type: text/xml"); 
	//header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS, REQUEST');
	
 	$host = "31.220.17.87"; 
	$user = "marlan4t";
	$pass = "mar2014doso";
	$database = "marlan4t_churchFinder"; 
            
	$linkID = mysql_connect($host, $user, $pass) or die("Could not connect to host."); 
	mysql_select_db($database, $linkID) or die("Could not find database.");

       //$data = array();
	
	  //$email = $//_POST["email"];
	  //$password = $//_POST["password"];
	  //$userPassword = $//_POST["userPassword"];
	  //$cryptpass = md5($userPassword);
	  
	  $sql = "SELECT * FROM Users WHERE username='" .$_GET['username']."' AND password='" .$_GET['password']."'";
	  $resultID = mysql_query($sql, $linkID) or die("Data not found."); 
	  
	  $xml_output = "<?xml version=\"1.0\"?>\n"; 
	  $xml_output .= "<User>\n"; 
	  
	  for($x = 0 ; $x < mysql_num_rows($resultID) ; $x++){ 
		$row = mysql_fetch_assoc($resultID); 
		if (mysql_num_rows($resultID) == 1) {
			$xml_output .= "\t<Details>\n"; 
			$xml_output .= "\t\t<userID>" . $row['userID'] . "</userID>\n";
			$xml_output .= "\t\t<username>" . $row['username'] . "</username>\n";
			$xml_output .= "\t\t<password>" . $row['password'] . "</password>\n";
			$xml_output .= "\t\t<email>" . $row['email'] . "</email>\n";
	            	$xml_output .= "\t</Details>\n"; 
		}
	        else {
	            $response['success'] = false;
	        }
	  }
	  
	  $xml_output .= "</User>"; 
	
	  echo $xml_output;
	
	  //mysqli_close();

?>