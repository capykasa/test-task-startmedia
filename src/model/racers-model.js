import { RACERS } from '../mock/racers';

export default class RacersModel {
  #racers = Object.values(RACERS);

  get racers() {
    return this.#racers;
  }
}
