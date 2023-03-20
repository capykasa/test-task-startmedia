<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include_once('init.php');

use System\Router;
use System\ModulesDispatcher;

use Modules\Races\Module as Races;

const BASE_URL = '/';

const CARS_URL = '/cars';
const ATTEMPTS_URL = '/attempts';
const RACES_URL = '/races';

const ALL_RACES = 'All Races';

try {
  $modules = new ModulesDispatcher();
  $modules->add(new Races());
  $router = new Router(BASE_URL);

  $modules->registerRoutes($router);

  $uri = $_SERVER['REQUEST_URI'];
  $activeRoute = $router->resolvePath($uri);

  $controller = $activeRoute['controller'];
  $method = $activeRoute['method'];

  $result = $controller->$method();
  $resultEncode = json_encode($result, JSON_UNESCAPED_UNICODE);

  echo $resultEncode;
} catch (Exception) {
  echo 'result display error';
}
