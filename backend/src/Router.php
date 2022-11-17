<?php

namespace App\Router;

use function App\Controller\actionGetCars;
use function App\Controller\actionGetAttempts;

function runRouter($rout) {
    switch ($rout) {
        case '/cars':
            actionGetCars();
            break;
        case '/attempts':
            actionGetAttempts();
            break;
        default:
            echo 'false';
    }
};
