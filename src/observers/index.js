import {map} from 'rxjs/operators';
import {fromEvent} from 'rxjs';


export default (game) => {
  game.pipe(map((state) => state.players))
      .subscribe(
          (players) => {
            document.getElementById('players').innerHTML = players.map(
                (player) => player.name).join('<br/>');
          });

  game.pipe(map((state) => state.actualCard))
      .subscribe(
          (actualCard) => {
            document.getElementById('new-card').innerHTML = `Carta actual: ${actualCard}`
          });

  game.pipe(map((state) => state.pile))
      .subscribe(
          (pile) => {
            const card = pile[pile.length-1]
            if (card) {
              document.getElementById('new-card').innerHTML = `<img class='card' src='/cards/${card}.svg' width='150'/>`
            }
          });

  fromEvent(document.getElementById('add-player'), 'click').subscribe(() => {
    game.addPlayer('Thomas');
  });
  fromEvent(document.getElementById('draw-card'), 'click').subscribe(() => {
    game.drawCard();
  });
};
