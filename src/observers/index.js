import {map} from 'rxjs/operators';
import {fromEvent} from 'rxjs';
import {updateNewCard, updateCardCount} from './cards';
import {updatePlayers} from './players';

export default (game) => {
  game.pipe(map((state) => state.players))
      .subscribe(updatePlayers(game));

  game.pipe(map((state) => [state.cardCount, state.status]))
      .subscribe(updateCardCount);

  game.pipe(map((state) => state.pile))
      .subscribe(updateNewCard);

  fromEvent(document, 'keydown').pipe(map(event => event.key.toLowerCase()))
      .subscribe(game.respondToInput);
};
