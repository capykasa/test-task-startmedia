import { render } from '../render.js';
import TableListView from '../view/table-list-view.js';
import TableTitleView from '../view/table-title-view.js';
import TableBodyView from '../view/table-body-view.js';
import RacerView from '../view/table-racer-view.js';

const ALL_RACES = 'All Races';
export default class BoardPresenter {
  #pageMainContainer = null;
  #racersModel = null;
  #attemptsModel = null;

  #racesSort = new Set([ALL_RACES]);
  #currentRace = ALL_RACES;

  #tableListComponent = new TableListView();
  #tableBodyComponent = new TableBodyView();

  constructor(pageMainContainer, racersModel, attemptsModel) {
    this.#pageMainContainer = pageMainContainer;
    this.#racersModel = racersModel;
    this.#attemptsModel = attemptsModel;
  }

  get racers() {
    return this.#racersModel.racers;
  }

  get attempts() {
    return this.#attemptsModel.attempts;
  }

  init = () => {
    this.#renderBoard();
  };

  #createdRaces = (racer, attempts) => {
    let raceNumber = 0;
    const currentAttempts = {};

    currentAttempts[ALL_RACES] = 0;

    attempts.forEach((attempt) => {
      if (racer.id === attempt.id) {
        raceNumber++;

        currentAttempts[ALL_RACES] += attempt.result;
        currentAttempts[raceNumber] = attempt.result;

        this.#racesSort.add(raceNumber)
      }
    })

    return currentAttempts;
  }

  #renderSort = (allSorts, sort) => {
    render(new TableTitleView(allSorts, sort), this.#tableListComponent.element);
  }

  #renderRacer = (racer, attempts) => {
    const currentAttempts = this.#createdRaces(racer, attempts);
    const currentAttempt = currentAttempts[this.#currentRace];

    render(new RacerView(racer, currentAttempt), this.#tableBodyComponent.element);
  };

  #renderRacers = (racers, attempts) => {
    racers.forEach((racer) => this.#renderRacer(racer, attempts));
  };

  #renderBoard = () => {
    const racers = this.racers;
    const attempts = this.attempts;

    render(this.#tableListComponent, this.#pageMainContainer);

    this.#renderSort(this.#racesSort, this.#currentRace);

    render(this.#tableBodyComponent, this.#tableListComponent.element);

    this.#renderRacers(racers, attempts);
  };
}
