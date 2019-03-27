import {fromEvent} from 'rxjs';
import Game from './game';
import configureObservers from './observers';
import './styles/index.scss';

const game = new Game();
game.genHandPlayers();

fromEvent(window, 'load').subscribe(() => {
  configureObservers(game);
});

if (module.hot) {
  module.hot.accept();
}
