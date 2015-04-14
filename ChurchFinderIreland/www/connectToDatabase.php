<?php

      header('Content-type: application/json');

      $server = "server23.000webhost.com";
      $username = "a6222808_marleys";
      $password = "marleys2010";
      $database = "a6222808_church";

      $con = mysql_connect($server, $username, $password) or die ("Could not connect: " . mysql_error());
      mysql_select_db($database, $con);

      $sql = "SELECT name, address FROM Church";
      $result = mysql_query($sql) or die ("Query error: " . mysql_error());

      $records = array();

      while($row = mysql_fetch_assoc($result)) {
          $records[] = $row;
      }
      mysql_close($con);

      echo $_GET['jsoncallback'] . '(' . json_encode($records) . ');';

  ?>
