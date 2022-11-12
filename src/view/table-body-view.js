import { createElement } from '../render';

const createTableBodyTemplate = () => `<tbody></tbody>`;

export default class TableBodyView {
  #element = null;

  get template() {
    return createTableBodyTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template, 'table');
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
