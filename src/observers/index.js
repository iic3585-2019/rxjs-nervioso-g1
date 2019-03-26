import {map} from 'rxjs/operators';
import {fromEvent} from 'rxjs';


export default (game) => {
  game.pipe(map((state) => state.players))
      .subscribe(
          (players) => {
            document.getElementById('players').innerHTML = players.map(
                (player) => {
                  let playerHMTL = `Nombre: ${player.name} <br/>`
                  playerHMTL += `Cartas restantes: ${player.stock.length}`
                  return playerHMTL;
                }).join('<br/>');
          });

  game.pipe(map((state) => state.cardCount))
      .subscribe(
          (cardCount) => {
            document.getElementById('card-count').innerHTML = `Contador de cartas: ${cardCount}`
          });

  game.pipe(map((state) => state.pile))
      .subscribe(
          (pile) => {
            const card = pile[pile.length-1]
            if (card) {
              document.getElementById('new-card').innerHTML = `<img class='card' src='/cards/${card}.svg' width='150'/>`
            }
          });

  fromEvent(document.getElementById('draw-card'), 'click').subscribe(() => {
    game.drawCard();
  });
};
