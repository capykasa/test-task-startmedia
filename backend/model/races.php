<?php

function getAllCars(): array {
  $cars = file_get_contents('storage/data_cars.json');

  return json_decode($cars, true);
}

function getAllAttempts(): array {
  $attempts = file_get_contents('storage/data_attempts.json');

  return json_decode($attempts, true);
}

/* Функция, которая принимает массивы гонщиков и результатов, а возвращает массив,
 где ключами идут номера гонок, в которых указаны все участники конкретной гонки */
function connectingResultsAndRacers($racers, $attempts): array {
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

/* Функция, которая принимает массивы гонщиков и результатов, а возвращает массив,
 где у каждого участника появляется информация по каждой гонке */
/* function connectingRacersAndResults($racers, $attempts): array {
  $raceNumber = 0;

  $racersWithResults = [];

  foreach ($racers as $racer) {
    $racerWithResult = $racer;
    $racerWithResult['races'][ALL_RACES] = 0;

    $raceNumber = 0;

    foreach ($attempts as $attempt) {
      if ($racerWithResult['id'] === $attempt['id']) {
        $raceNumber++;

        $racerWithResult['races'][ALL_RACES] += $attempt['result'];
        $racerWithResult['races']["race $raceNumber"] = $attempt['result'];
      }
    }

    $racersWithResults[] = $racerWithResult;
  }

  return $racersWithResults;
} */
