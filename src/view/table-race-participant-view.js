import { createElement } from '../render';

const createRaceParticipantTemplate = () => (
  `<tr class="race-participant">
    <td class="race-participant__item race-table__item race-table__position">
      <span class="race-participant__span">1</span>
    </td>
    <td class="race-participant__item race-table__item">
      <span class="race-participant__span">Alfonso G.</span>
    </td>
    <td class="race-participant__item race-table__item">
      <span class="race-participant__span">New York</span>
    </td>
    <td class="race-participant__item race-table__item">
      <span class="race-participant__span">Nissan GTR</span>
    </td>
    <td class="race-participant__item race-table__item">
      <span class="race-participant__span">12</span>
    </td>
  </tr>`
);

export default class RaceParticipantView {
  getTemplate() {
    return createRaceParticipantTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
