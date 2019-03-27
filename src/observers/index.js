import {map} from 'rxjs/operators';
import {fromEvent} from 'rxjs';
import {updateNewCard, updateCardCount} from './cards';
import {updatePlayers} from './players';

export default (game) => {
  game.pipe(map((state) => state.players))
      .subscribe(updatePlayers);

  game.pipe(map((state) => state.cardCount))
      .subscribe(updateCardCount);

  game.pipe(map((state) => state.pile))
      .subscribe(updateNewCard);

  fromEvent(document, 'keydown').subscribe(game.respondToInput);

  fromEvent(document.getElementById('draw-card'), 'click').subscribe(() => {
    game.drawCard();
  });
};
