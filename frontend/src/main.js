import './scss/index.scss';
import BoardPresenter from './presenter/board-presenter';
import RacesModel from './model/races-model';
import Api from './api';

const END_POINT = 'http://localhost:8000';

const siteMainElement = document.querySelector('.page-main');
const sitePageMainElement = siteMainElement.querySelector('.page-main__container');

const racesModel = new RacesModel(new Api(END_POINT));

const boardPresenter = new BoardPresenter(
  sitePageMainElement,
  racesModel
);

boardPresenter.init();
racesModel.init();

