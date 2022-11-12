import { render, RenderPosition } from '../render.js';
import TableListView from '../view/table-list-view.js';
import TableTitleView from '../view/table-title-view.js';
import RaceParticipantView from '../view/table-race-participant-view.js';
import TableHeadView from '../view/table-head-view.js';
import TableBodyView from '../view/table-body-view.js';

export default class BoardPresenter {
  tableListComponent = new TableListView();
  tableTitleComponent = new TableTitleView();
  tableBodyComponent = new TableBodyView();
  raceParticipantComponent = new RaceParticipantView();

  init = (pageMainContainer) => {
    this.pageMainContainer = pageMainContainer;

    render(this.tableListComponent, this.pageMainContainer);
    render(this.tableTitleComponent, this.tableListComponent.element);
    render(this.tableBodyComponent, this.tableListComponent.element);

    for (let i = 0; i < 3; i++) {
      render(new RaceParticipantView(), this.tableBodyComponent.element);
    }
  };
}
