import { createElement } from '../render';

const createRacerTemplate = (racer, currentSort) => {
  const { name, city, car, races } = racer;
  const currentResult = races[currentSort];

  return (
    `<tr class="race-participant">
      <td class="race-participant__item race-table__item race-table__position">
        <span class="race-participant__span">1</span>
      </td>
      <td class="race-participant__item race-table__item">
        <span class="race-participant__span">${name}</span>
      </td>
      <td class="race-participant__item race-table__item">
        <span class="race-participant__span">${city}</span>
      </td>
      <td class="race-participant__item race-table__item">
        <span class="race-participant__span">${car}</span>
      </td>
      <td class="race-participant__item race-table__item">
        <span class="race-participant__span">${currentResult}</span>
      </td>
    </tr>`
  );
};

export default class RacerView {
  #element = null;
  #racer = null;
  #currentSort = null;

  constructor(racer, currentSort) {
    this.#racer = racer;
    this.#currentSort = currentSort;
  }

  get template() {
    return createRacerTemplate(this.#racer, this.#currentSort);
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
