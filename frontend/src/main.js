import './scss/index.scss';
import BoardPresenter from './presenter/board-presenter';
import RacersModel from './model/racers-model';
import Api from './api';

const END_POINT = 'http://localhost:8000';

const siteMainElement = document.querySelector('.page-main');
const sitePageMainElement = siteMainElement.querySelector('.page-main__container');

const racersModel = new RacersModel(new Api(END_POINT));

const boardPresenter = new BoardPresenter(
  sitePageMainElement,
  racersModel
);

boardPresenter.init();
racersModel.init();

