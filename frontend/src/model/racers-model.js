import { UpdateType } from '../const';
import Observable from '../utils/observable';

export default class RacersModel extends Observable {
  #api = null;
  #racers = [];
  #attempts = [];

  constructor(api) {
    super();
    this.#api = api;
  }

  get racers() {
    return this.#racers;
  }

  get attempts() {
    return this.#attempts;
  }

  init = async () => {
    try {
      const racers = await this.#api.cars;
      const attempts = await this.#api.attempts;
      this.#racers = Object.values(racers);
      this.#attempts = Object.values(attempts);
    } catch (err) {
      this.#racers = [];
      this.#attempts = [];
    }

    this._notify(UpdateType.INIT);
  };
}
