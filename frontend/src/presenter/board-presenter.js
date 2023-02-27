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

  get races() {
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

  #generateSort = (races) => {
    return Object.keys(races);
  }

  #getCurrentRacers = (races) => {
    const sortRacers = races[this.#currentSortType];

    const filterRacers = sortRacers.filter((racer) =>
      racer.result !== 0 && racer.result !== undefined
    )

    filterRacers.sort((racerA, racerB) =>
      racerA.result < racerB.result
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

  #renderRacer = (racer) => {
    render(new RacerView(racer), this.#tableBodyComponent.element);
  }

  #renderRacers = (racers) => {
    racers.forEach((racer) => this.#renderRacer(racer));
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
      this.#racesSort = this.#generateSort(this.races);
      this.#currentSortType = this.#racesSort[0];
    }

    const racers = this.#getCurrentRacers(this.races);
    this.#generateRacerPosition(racers);

    render(this.#tableListComponent, this.#pageMainContainer);
    render(this.#tableHeadComponent, this.#tableListComponent.element);

    this.#renderSort(this.#racesSort, this.#currentSortType);

    render(this.#tableBodyComponent, this.#tableListComponent.element);

    this.#renderRacers(racers);
  }
}
