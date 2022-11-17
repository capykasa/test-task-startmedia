<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once __DIR__ . '/../vendor/autoload.php';

$currentUrl = $_SERVER['REQUEST_URI'];

use function App\Router\runRouter;

runRouter($currentUrl);
