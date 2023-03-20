<?php

namespace Modules\Races\Controllers;

use Modules\Races\Models\Index as ModelsIndex;

class Index {
  protected ModelsIndex $model;

  public function __construct() {
    $this->model = ModelsIndex::getInstance();
  }

  public function cars() {
    $cars = file_get_contents('storage/data_cars.json');

    return json_decode($cars, true);
  }

  public function attempts() {
    $attempts = file_get_contents('storage/data_attempts.json');

    return json_decode($attempts, true);
  }

  public function races(): array {
    $racers = $this->cars();
    $attempts = $this->attempts();

    $raceNumber = 0;
    $resultsWithRacers[ALL_RACES] = [];

    foreach ($racers as $racer) {
      $raceNumber = 0;
      $allResult = 0;

      foreach ($attempts as $attempt) {
        if ($attempt['id'] === $racer['id']) {
          $raceNumber++;
          $allResult += $attempt['result'];

          $resultsWithRacers["race $raceNumber"][] = $racer + ['result' => $attempt['result']];
        }
      }

      $resultsWithRacers[ALL_RACES][] = $racer + ['result' => $allResult];
    }

    return $resultsWithRacers;
  }
}
