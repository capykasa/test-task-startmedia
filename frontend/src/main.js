import './scss/index.scss';
import BoardPresenter from './presenter/board-presenter';
import RacersModel from './model/racers-model';
import AttemptsModel from './model/attempts-model';

const siteMainElement = document.querySelector('.page-main');
const sitePageMainElement = siteMainElement.querySelector('.page-main__container');

const racersModel = new RacersModel();
const attemptsModel = new AttemptsModel();

const boardPresenter = new BoardPresenter(
  sitePageMainElement,
  racersModel,
  attemptsModel
);

fetch('http://localhost:8000/cars')
  .then((response) => response.json())
  .then((resp) => console.log(resp))

boardPresenter.init();

