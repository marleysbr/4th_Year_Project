<?php
	try	{
		$pdo = new PDO('mysql:host=localhost;dbname=a6222808_church', 'a6222808_marleys', 'mar2014doso');
		$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$pdo->exec('SET NAMES "utf8"');
	}
	catch (PDOException $e)	{
		echo 'Unable to connect to the database server: ' . $e->getMessage();
		exit();
	}
?>