<?php

namespace Modules\Races;

use System\Contracts\IModule;
use System\Contracts\IRouter;
use Modules\Races\Controllers\Index as C;

class Module implements IModule {
  public function registerRoutes(IRouter $router): void {
    $router->addRoute("/^cars$/", C::class, 'cars');
    $router->addRoute("/^attempts$/", C::class, 'attempts');
    $router->addRoute("/^races$/", C::class, 'races');
  }
}
