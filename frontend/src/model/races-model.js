import { UpdateType } from '../const';
import Observable from '../utils/observable';

export default class RacersModel extends Observable {
  #api = null;
  #racers = [];
  #races = [];

  constructor(api) {
    super();
    this.#api = api;
  }

  get racers() {
    return this.#racers;
  }

  get races() {
    return this.#races;
  }

  init = async () => {
    try {
      this.#racers = await this.#api.racers;
      this.#races = await this.#api.races;
    } catch (err) {
      this.#racers = [];
      this.#races = [];
    }

    this._notify(UpdateType.INIT);
  };
}
