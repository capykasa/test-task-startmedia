import { render } from '../render.js';
import TableListView from '../view/table-list-view.js';
import TableTitleView from '../view/table-title-view.js';
import TableBodyView from '../view/table-body-view.js';
import RacerView from '../view/table-racer-view.js';

export default class BoardPresenter {
  #pageMainContainer = null;
  #racersModel = null;
  #attemptsModel = null;

  #tableListComponent = new TableListView();
  #tableTitleComponent = new TableTitleView();
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

  #renderRacer = (racer) => {
    render(new RacerView(racer), this.#tableBodyComponent.element);
  };

  #renderRacers = (racers) => {
    racers.forEach((racer) => this.#renderRacer(racer));
  };

  #renderBoard = () => {
    const racers = this.racers;

    render(this.#tableListComponent, this.#pageMainContainer);
    render(this.#tableTitleComponent, this.#tableListComponent.element);
    render(this.#tableBodyComponent, this.#tableListComponent.element);

    this.#renderRacers(racers);
  };
}
