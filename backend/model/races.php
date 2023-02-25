<?php

function getAllCars() {
  $cars = file_get_contents('storage/data_cars.json');

  return $cars;
}

function getAllAttempts() {
  $attempts = file_get_contents('storage/data_attempts.json');

  return $attempts;
}
