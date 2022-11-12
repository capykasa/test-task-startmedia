import { createElement } from '../render';

const createTableTitleTemplate = () => (
  `<thead>
    <tr class="race-title">
      <th class="race-title__item race-table__item">
        <span class="race-title__span">№</span>
      </th>
      <th class="race-title__item race-table__item">
        <span class="race-title__span">Name</span>
      </th>
      <th class="race-title__item race-table__item">
        <span class="race-title__span">City</span>
      </th>
      <th class="race-title__item race-table__item">
        <span class="race-title__span">Car</span>
      </th>
      <th class="race-title__item race-table__item">
        <form class="race-sort" action="#" method="get">
          <span class="race-sort__span">Result of</span>
          <span class="race-sort__type">
            race 1
            <button class="race-sort__tuggle">
              <svg width="7" height="4" viewBox="0 0 7 4" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z" />
              </svg>
            </button>
          </span>
          <ul class="race-sort__options race-sort__options--custom race-sort__options--opened">
            <li class="race-sort__option race-sort__option--active" tabindex="0">all races</li>
            <li class="race-sort__option" tabindex="0">race 1</li>
            <li class="race-sort__option" tabindex="0">race 2</li>
            <li class="race-sort__option" tabindex="0">race 3</li>
            <li class="race-sort__option" tabindex="0">race 4</li>
          </ul>
        </form>
      </th>
    </tr>
  </thead>`
);

export default class TableTitleView {
  #element = null;

  get template() {
    return createTableTitleTemplate();
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
