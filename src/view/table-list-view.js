import { createElement } from '../render';

const createTableListTemplate = () => `<table class="race-table"></table>`;

export default class TableListView {
  #element = null;

  get template() {
    return createTableListTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
