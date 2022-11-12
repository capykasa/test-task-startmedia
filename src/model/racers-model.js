import { RACERS } from '../mock/racers';

export default class RacersModel {
  #racers = Object.values(RACERS);

  get racers() {
    console.log('1', this.#racers);
    return this.#racers;
  }
}
