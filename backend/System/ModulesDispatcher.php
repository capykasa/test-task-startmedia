<?php

namespace System;

use System\Contracts\IModule;
use System\Contracts\IRouter;

class ModulesDispatcher {
  protected array $modules = [];

  public function add(IModule $module): void {
    $this->modules[] = $module;
  }

  public function registerRoutes(IRouter $router): void {
    foreach ($this->modules as $module) {
      $module->registerRoutes($router);
    }
  }
}
