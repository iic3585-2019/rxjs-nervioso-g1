import {map} from 'rxjs/operators';
import {fromEvent} from 'rxjs';

const updatePlayers = (players) => {
  document.getElementById('players').innerHTML = players.map(
      (player) =>
        `Nombre: ${player.name} <br/> Cartas restantes: ${player.stock.length}`)
      .join('<br/>');
};

const updateCardCount = (cardCount) => {
  document.getElementById('card-count').innerHTML =
      `Contador de cartas: ${cardCount}`;
};

const updateNewCard = (pile) => {
  const card = pile[pile.length-1];
  if (card) {
    document.getElementById('new-card').innerHTML =
        `<img class='card' src='/cards/${card}.svg' width='150'/>`;
  }
};

export default (game) => {
  game.pipe(map((state) => state.players))
      .subscribe(updatePlayers);

  game.pipe(map((state) => state.cardCount))
      .subscribe(updateCardCount);

  game.pipe(map((state) => state.pile))
      .subscribe(updateNewCard);

  fromEvent(document.getElementById('draw-card'), 'click').subscribe(() => {
    game.drawCard();
  });
};
