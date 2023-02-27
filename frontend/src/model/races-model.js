import { UpdateType } from '../const';
import Observable from '../utils/observable';

export default class RacersModel extends Observable {
  #api = null;
  #races = [];

  constructor(api) {
    super();
    this.#api = api;
  }

  get races() {
    return this.#races;
  }

  init = async () => {
    try {
      this.#races = await this.#api.races;
    } catch (err) {
      this.#races = [];
    }

    this._notify(UpdateType.INIT);
  };
}
