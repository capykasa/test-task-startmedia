import { createElement } from '../render';

const createTableHeadTemplate = () => '<thead></thead>';

export default class TableHeadView {
  #element = null;

  get template() {
    return createTableHeadTemplate();
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
