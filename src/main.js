import './scss/index.scss';
import BoardPresenter from './presenter/board-presenter.js';

const siteMainElement = document.querySelector('.page-main');
const sitePageMainElement = siteMainElement.querySelector('.page-main__container');
const boardPresenter = new BoardPresenter();

boardPresenter.init(sitePageMainElement);

