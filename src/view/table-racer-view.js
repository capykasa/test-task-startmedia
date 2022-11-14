import { createElement } from '../render';

const createRacerTemplate = (racer) => {
  const { name, city, car } = racer;

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
        <span class="race-participant__span">${null}</span>
      </td>
    </tr>`
  );
};

export default class RacerView {
  #element = null;
  #racer = null;

  constructor(racer, attempt) {
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
