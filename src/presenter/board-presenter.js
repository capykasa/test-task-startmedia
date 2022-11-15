import { remove, render } from '../render.js';
import TableListView from '../view/table-list-view.js';
import TableHeadView from '../view/table-head-view.js';
import TableTitleView from '../view/table-title-view.js';
import TableBodyView from '../view/table-body-view.js';
import RacerView from '../view/table-racer-view.js';

const ALL_RACES = 'All Races';
export default class BoardPresenter {
  #pageMainContainer = null;
  #racersModel = null;
  #attemptsModel = null;

  #racesSort = new Set([ALL_RACES]);
  #currentSortType = ALL_RACES;

  #tableListComponent = new TableListView();
  #tableHeadComponent = new TableHeadView();
  #tableBodyComponent = new TableBodyView();
  #tableTitleComponent = null;

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

  #connectingRacersAndResults = (racers, attempts) => {
    let raceNumber = 0;

    racers.map((racer) => {
      racer.races = {};
      racer.races[ALL_RACES] = 0;

      raceNumber = 0;

      attempts.forEach((attempt) => {
        if (racer.id === attempt.id) {
          raceNumber++;

          racer.races[ALL_RACES] += attempt.result;
          racer.races[`race ${raceNumber}`] = attempt.result;

          this.#racesSort.add(`race ${raceNumber}`)
        }
      })
    });

    const filterRacers = racers.filter((racer) =>
      racer.races[this.#currentSortType] !== 0 && racer.races[this.#currentSortType] !== undefined
    );

    filterRacers.sort((racerA, racerB) =>
      racerA.races[this.#currentSortType] < racerB.races[this.#currentSortType]
        ? 1
        : -1
    );

    return filterRacers;
  }

  #sortClickHandler = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  }

  #renderSort = (allSorts, currentSort) => {
    this.#tableTitleComponent = new TableTitleView(allSorts, currentSort);
    this.#tableTitleComponent.setSortClickHandler(this.#sortClickHandler);
    render(this.#tableTitleComponent, this.#tableHeadComponent.element);
  }

  #renderRacer = (racer, currentSort) => {
    render(new RacerView(racer, currentSort), this.#tableBodyComponent.element);
  };

  #renderRacers = (racers, currentSort) => {
    racers.forEach((racer) => this.#renderRacer(racer, currentSort));
  };

  #clearBoard = () => {
    remove(this.#tableListComponent);
    remove(this.#tableHeadComponent);
    remove(this.#tableBodyComponent);
  };

  #renderBoard = () => {
    const racers = this.#connectingRacersAndResults(this.racers, this.attempts);

    render(this.#tableListComponent, this.#pageMainContainer);
    render(this.#tableHeadComponent, this.#tableListComponent.element);

    this.#renderSort(this.#racesSort, this.#currentSortType);

    render(this.#tableBodyComponent, this.#tableListComponent.element);

    this.#renderRacers(racers, this.#currentSortType);
  };
}
