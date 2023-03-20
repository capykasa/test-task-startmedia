<?php

spl_autoload_register(function ($name) {
  $path = str_replace('\\', '/', $name) . '.php';

  if (file_exists($path)) {
    include_once($path);
  }
});
