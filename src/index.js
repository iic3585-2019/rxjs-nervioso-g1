import {fromEvent} from 'rxjs/index';
import Game from './game';
import configureObservers from './observers';
import './styles/index.scss';

const game = new Game();

fromEvent(window, 'load').subscribe(() => {
  configureObservers(game);
});

if (module.hot) {
  module.hot.accept();
}
