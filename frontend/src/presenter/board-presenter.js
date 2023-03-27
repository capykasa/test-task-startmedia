import { remove, render } from '../render.js';
import LoadingView from '../view/loading-view.js';
import TableListView from '../view/table-list-view.js';
import TableHeadView from '../view/table-head-view.js';
import TableTitleView from '../view/table-title-view.js';
import TableBodyView from '../view/table-body-view.js';
import RacerView from '../view/table-racer-view.js';
import { UpdateType } from '../const.js';

const FIRST_POSITION = '1';
export default class BoardPresenter {
  #pageMainContainer = null;
  #racesModel = null;

  #loadingComponent = new LoadingView();
  #tableListComponent = new TableListView();
  #tableHeadComponent = new TableHeadView();
  #tableBodyComponent = new TableBodyView();
  #tableTitleComponent = null;

  #racesSort = [];
  #currentSortType = null;
  #isLoading = true;

  constructor(pageMainContainer, racersModel) {
    this.#pageMainContainer = pageMainContainer;
    this.#racesModel = racersModel;

    this.#racesModel.addObserver(this.#handleModelEvent);
  }

  get racers() {
    return Object.values(this.#racesModel.racers);
  }

  get sort() {
    return this.#racesModel.races;
  }

  init = () => {
    this.#renderBoard();
  }

  #handleModelEvent = (updateType) => {
    switch (updateType) {
      case UpdateType.PATCH:
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
    }
  };

  #getCurrentSortingRacers = (racers) => {
    const filterRacers = racers.filter((racer) =>
      racer.results[this.#currentSortType] !== 0 && racer.results[this.#currentSortType] !== undefined
    );

    filterRacers.sort((racerA, racerB) =>
      racerA.results[this.#currentSortType] < racerB.results[this.#currentSortType]
        ? 1
        : -1
    )

    return filterRacers;
  }

  #generateRacerPosition = (racers) => {
    let position = FIRST_POSITION;
    racers.map((racer) => {
      racer.currentPosition = position;
      position++;
    })

    return racers;
  }

  #sortClickHandler = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  }

  #renderLoading = () => {
    render(this.#loadingComponent, this.#pageMainContainer);
  };

  #renderSort = (allSorts, currentSort) => {
    this.#tableTitleComponent = new TableTitleView(allSorts, currentSort);
    this.#tableTitleComponent.setSortClickHandler(this.#sortClickHandler);
    render(this.#tableTitleComponent, this.#tableHeadComponent.element);
  }

  #renderRacer = (racer, currentSort) => {
    render(new RacerView(racer, currentSort), this.#tableBodyComponent.element);
  }

  #renderRacers = (racers, currentSort) => {
    racers.forEach((racer) => this.#renderRacer(racer, currentSort));
  }

  #clearBoard = () => {
    remove(this.#tableListComponent);
    remove(this.#tableHeadComponent);
    remove(this.#tableBodyComponent);
  }

  #renderBoard = () => {

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (this.#currentSortType === null) {
      this.#racesSort = this.sort;
      this.#currentSortType = this.#racesSort[0];
    }

    const racers = this.#getCurrentSortingRacers(this.racers);
    this.#generateRacerPosition(racers);

    render(this.#tableListComponent, this.#pageMainContainer);
    render(this.#tableHeadComponent, this.#tableListComponent.element);

    this.#renderSort(this.#racesSort, this.#currentSortType);

    render(this.#tableBodyComponent, this.#tableListComponent.element);

    this.#renderRacers(racers, this.#currentSortType);
  }
}
