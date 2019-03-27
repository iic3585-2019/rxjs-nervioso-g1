import {map} from 'rxjs/operators';
import {fromEvent} from 'rxjs';
import {updateNewCard, updateCardCount} from './cards';
import {updatePlayers} from './players';
import {getFirstCard} from '../game/util';

export default (game) => {
  game.pipe(map((state) => state.players))
      .subscribe(updatePlayers);

  game.pipe(map((state) => state.cardCount))
      .subscribe(updateCardCount);

  game.pipe(map((state) => state.pile))
      .subscribe(updateNewCard);

  fromEvent(document, 'keydown').subscribe(data => {
    if (data.key === game.state.players[game.state.turnIndex].keyDraw) {
      if (game.state.handPlayers.reduce((a, b) => a + b) > 0) {
        game.state.players[game.state.turnIndex].mergePileToStock(game.state.pile);
        game.state.pile = [];
        game.state.cardCount = getFirstCard();
        game.state.handPlayers.fill(0);
        return;
      }
      game.drawCard();
      return;
    }

    const handPlayerArr = game.state.players.filter(a => data.key === a.keyHand);
    if (handPlayerArr.length > 0) {
      const handPlayer = handPlayerArr[0];
      if (game.state.pile.length > 0) {
        if (game.state.pile.slice(-1).pop()[0] === game.state.cardCount) {
          game.state.handPlayers[game.state.players.indexOf(handPlayer)] = 1;
          if (game.state.handPlayers.reduce((a, b) => a + b) === game.state.handPlayers.length - 1) {
            const loserIndex = game.state.handPlayers.indexOf(0);
            const loser = game.state.players[loserIndex];
            loser.mergePileToStock(game.state.pile);
            game.state.pile = [];
            game.state.cardCount = getFirstCard();
            game.state.handPlayers.fill(0);
            game.state.turnIndex = loserIndex;
            return;
          }
        } else {
          const handPlayerIndex = game.state.players.indexOf(handPlayer);
          handPlayer.mergePileToStock(game.state.pile);
          game.state.pile = [];
          game.state.cardCount = getFirstCard();
          game.state.handPlayers.fill(0);
          game.state.turnIndex = handPlayerIndex;
          return;
        }
      }
    }

  });

  fromEvent(document.getElementById('draw-card'), 'click').subscribe(() => {
    game.drawCard();
  });
};
