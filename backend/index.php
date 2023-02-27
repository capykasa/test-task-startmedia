<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include_once('init.php');

$currentUrl = $_SERVER['REQUEST_URI'];

$cars = getAllCars();
$attempts = getAllAttempts();

$resultsWithRacers = connectingResultsAndRacers($cars, $attempts);

$races = json_encode($resultsWithRacers, JSON_UNESCAPED_UNICODE);

switch ($currentUrl) {
  case RACES_URL:
    echo $races;
    break;
  default:
    echo 'result display error';
}
