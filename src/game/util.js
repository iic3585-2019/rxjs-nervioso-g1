import Player from './player';
import {DECK} from './consts';


export const randomPop = (array) => {
  const index = Math.floor(Math.random() * array.length);
  return array.splice(index, 1)[0];
};

export const createPlayers = () => {
  const p1 = new Player('Thomas', 'A', 'S');
  const p2 = new Player('Pezoa', 'C', 'V');
  const players = [p1, p2];

  const deck = [...DECK];
  while (deck.length) {
    players.forEach((player) => {
      if (deck.length) {
        player.addCardToStock(randomPop(deck));
      }
    });
  }
  return players;
};
