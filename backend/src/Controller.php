<?php

namespace App\Controller;

$cars = file_get_contents('../storage/data_cars.json');
$attempts = file_get_contents('../storage/data_attempts.json');

function actionGetCars() {
    echo file_get_contents('../storage/data_cars.json');;
};

function actionGetAttempts() {
    echo file_get_contents('../storage/data_attempts.json');
};
