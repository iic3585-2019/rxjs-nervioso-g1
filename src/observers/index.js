import {map} from 'rxjs/operators';
import {fromEvent} from 'rxjs/index';


export default (game) => {
  game.pipe(map((state) => state.players))
      .subscribe(
          (players) => {
            document.getElementById('players').innerHTML = players.map(
                (player) => player.name).join('<br/>');
          });
  fromEvent(document.getElementById('add-player'), 'click').subscribe(() => {
    game.addPlayer('Thomas');
  });
};
