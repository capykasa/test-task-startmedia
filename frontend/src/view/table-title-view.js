import { createElement } from '../render';

const createTableSortTemplate = (allSorts, currentSort) => {
  allSorts = [...allSorts];

  return (
    `<ul class="race-sort__options visually-hidden" >
      ${allSorts.map((sort) =>
      `<li
        class="${sort === currentSort ? "race-sort__option race-sort__option--active" : "race-sort__option"}"
        data-sort-type="${sort}"
        tabindex="0"
        >
        ${sort}
        </li>`
    ).join('')}
    </ul>`
  );
}

const createTableTitleTemplate = (allSorts, currentSort) => (
  `<tr class="race-title">
    <th class="race-title__item race-title__position race-table__item">
      <span class="race-title__span">№</span>
    </th>
    <th class="race-title__item race-title__name race-table__item">
      <span class="race-title__span">Name</span>
    </th>
    <th class="race-title__item race-title__city race-table__item">
      <span class="race-title__span">City</span>
    </th>
    <th class="race-title__item race-title__car race-table__item">
      <span class="race-title__span">Car</span>
    </th>
    <th class="race-title__item race-title__sort race-table__item">
      <form class="race-sort" action="#" method="get">
        <span class="race-sort__span">Result of</span>
        <span class="race-sort__type">
          ${currentSort}
          <button class="race-sort__tuggle">
            <svg width="7" height="4" viewBox="0 0 7 4" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z" />
            </svg>
          </button>
        </span>

        ${createTableSortTemplate(allSorts, currentSort)}

      </form>
    </th>
  </tr>`
)

export default class TableTitleView {
  #element = null;
  #currentSort = null;
  #allSorts = null;

  _callback = {};

  constructor(allSorts, currentSort) {
    this.#allSorts = allSorts;
    this.#currentSort = currentSort;

    this.element.querySelector('.race-sort__tuggle')
      .addEventListener('click', this.#sortPanelHandler);

  }

  get template() {
    return createTableTitleTemplate(this.#allSorts, this.#currentSort);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template, 'tbody');
    }

    return this.#element;
  }

  #sortPanelHandler = () => {
    this.element.querySelector('.race-sort__options')
      .classList.toggle('visually-hidden');
  }

  setSortClickHandler = (callback) => {
    this._callback.sortClick = callback;
    this.element.querySelector('.race-sort__options')
      .addEventListener('click', this.#sortClickHandler);
  }

  #sortClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.sortClick(evt.target.dataset.sortType);
  }

  removeElement() {
    this.#element = null;
  }
}
