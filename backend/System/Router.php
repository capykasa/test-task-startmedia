<?php

namespace System;

use Exception;
use System\Contracts\IRouter;

class Router implements IRouter {
  protected string $baseUrl;
  protected int $baseShift;
  protected array $routes = [];

  public function __construct(string $baseUrl = '') {
    $this->baseUrl = $baseUrl;
    $this->baseShift = strlen($this->baseUrl);
  }

  public function addRoute(string $regExp, string $name, string $method = 'index'): void {
    $this->routes[] = [
      'path' => $regExp,
      'controller' => $name,
      'method' => $method
    ];
  }

  public function resolvePath(string $url): array {
    $relativeUrl = substr($url, $this->baseShift);
    $route = $this->findPath($relativeUrl);
    $controller = new $route['controller']();

    return [
      'controller' => $controller,
      'method' => $route['method']
    ];
  }

  protected function findPath(string $url): array {
    $activeRoute = null;
    print_r($activeRoute);

    foreach ($this->routes as $route) {

      if (preg_match($route['path'], $url)) {
        $activeRoute = $route;
      }
    }

    if ($activeRoute === null) {
      throw new Exception('route not found');
    }

    return $activeRoute;
  }
}
