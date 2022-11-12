import { render } from '../render.js';
import TableTitleView from '../view/table-title-view.js';
import RaceParticipantView from '../view/table-race-participant-view.js';

export default class BoardPresenter {
  tableTitleComponent = new TableTitleView();

  init = (tableContainer) => {
    this.tableContainer = tableContainer;

    render(this.tableTitleComponent, this.tableContainer);

    for (let i = 0; i < 3; i++) {
      render(new RaceParticipantView(), this.tableTitleComponent.getElement());
    }
  };
}
