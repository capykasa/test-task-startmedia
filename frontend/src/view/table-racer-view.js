import { createElement } from '../render';

const createRacerTemplate = (racer, currentSort) => {
  const { name, city, car, races, result, currentPosition } = racer;

  return (
    `<tr class="race-participant">
      <td class="race-participant__item race-participant__position race-table__item race-table__position">
        <span class="race-participant__span">${currentPosition}</span>
      </td>
      <td class="race-participant__item race-participant__name race-table__item">
        <span class="race-participant__span">${name}</span>
      </td>
      <td class="race-participant__item race-participant__city race-table__item">
        <span class="race-participant__span">${city}</span>
      </td>
      <td class="race-participant__item race-participant__car race-table__item">
        <span class="race-participant__span">${car}</span>
      </td>
      <td class="race-participant__item race-participant__result race-table__item">
        <span class="race-participant__span">${result}</span>
      </td>
    </tr>`
  );
}

export default class RacerView {
  #element = null;
  #racer = null;

  constructor(racer) {
    this.#racer = racer;
  }

  get template() {
    return createRacerTemplate(this.#racer);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template, 'tbody');
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
