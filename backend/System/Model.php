<?php

namespace System;

abstract class Model {
  protected static $instance;

  public static function getInstance(): static {
    if (static::$instance === null) {
      static::$instance = new static();
    }

    return static::$instance;
  }
}
