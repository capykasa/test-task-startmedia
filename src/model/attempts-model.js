import { ATTEMPTS } from '../mock/attempts';

export default class AttemptsModel {
  #attempts = Object.values(ATTEMPTS);

  get attempts() {
    return this.#attempts;
  }
}
