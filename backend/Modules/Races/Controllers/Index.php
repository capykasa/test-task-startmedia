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

  public function racers() {
    $racers = $this->cars();
    $attempts = $this->attempts();

    $newRacers = array_column($racers, null, 'id');

    foreach ($attempts as $attempt) {

      !array_key_exists('results', $newRacers[$attempt['id']])
        ? $currentRaceNumber = 1
        : $currentRaceNumber = (int)array_key_last($newRacers[$attempt['id']]['results']) + 1;

      !array_key_exists('results', $newRacers[$attempt['id']])
        ? $newRacers[$attempt['id']]['results'][ALL_RACES] = $attempt['result']
        : $newRacers[$attempt['id']]['results'][ALL_RACES] += $attempt['result'];

      $newRacers[$attempt['id']]['results'][$currentRaceNumber] = $attempt['result'];
    }

    return $newRacers;
  }

  protected function getNumbersOfRaces(array $attempts): array {
    $races = [];
    $attemptsId = [];

    foreach ($attempts as $attempt) {
      $attemptsId[] = $attempt['id'];
    }

    echo '<pre>';
    print_r($attemptsId);
    echo '</pre>';
    echo '<hr>';
    return $races;
  }
}
