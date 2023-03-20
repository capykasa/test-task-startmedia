<?php

namespace System\Contracts;

interface IModule {
  public function registerRoutes(IRouter $router): void;
}
