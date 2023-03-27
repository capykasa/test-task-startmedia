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

  public function races() {
    $attempts = $this->attempts();
    $attemptsId = [];
    $races = [ALL_RACES];

    foreach ($attempts as $attempt) {
      $attemptsId[] = $attempt['id'];
    }

    $maxNumberRaces =  max(array_count_values($attemptsId));
    $racesCount = range(1, $maxNumberRaces, 1);

    return array_merge($races, $racesCount);
  }

  public function racers(): array {
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

    return $races;
  }
}
