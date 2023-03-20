<?php

namespace System\Contracts;

interface IRouter {
  public function addRoute(string $url, string $contorllerName, string $contorllerMethod = 'index'): void;
  public function resolvePath(string $url): array;
}
