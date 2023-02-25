<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include_once('init.php');

$currentUrl = $_SERVER['REQUEST_URI'];
$cars = getAllCars();
$attempts = getAllAttempts();

switch ($currentUrl) {
  case CARS_URL:
    echo $cars;
    break;
  case ATTEMPTS_URL:
    echo $attempts;
    break;
  default:
    echo 'result display error';
}
