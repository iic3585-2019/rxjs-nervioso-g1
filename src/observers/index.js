import {map} from 'rxjs/operators';
import {fromEvent} from 'rxjs';


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
  fromEvent(document.getElementById('draw-card'), 'click').subscribe(() => {
    game.drawCard();
  });
};
