<?php
include("./proxy.php");

//setup the Proxy with the right credentials
$mySwapiProxy = new Proxy('https://api-web.nhle.com');
// $mySwapiProxy = new Proxy('https://swapi.py4e.com/api/');
//get the data
$result = $mySwapiProxy->getData('v1/club-stats/NSH/20232024/2');
// $result = $mySwapiProxy->getData('people/1/');
//print the data to the frontend.
print_r($result);