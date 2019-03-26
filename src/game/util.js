import Player from './player';
import {DECK, CARDS_NUMBERS} from './consts';


export const randomPop = (array) => {
  const index = Math.floor(Math.random() * array.length);
  return array.splice(index, 1)[0];
};


export const distributeDeck = (players) => {
  const deck = [...DECK];
  while (deck.length) {
    players.forEach((player) => {
      if (deck.length) {
        player.addCardToStock(randomPop(deck));
      }
    });
  }
};

export const createPlayers = () => {
  // TODO: change parameters to corresponding event
  const p1 = new Player('Thomas', 'A', 'S');
  const p2 = new Player('Pezoa', 'C', 'V');

  const players = [p1, p2];
  distributeDeck(players);

  return players;
};


export const getNextCard = (actualCard) => {
  const cardIndex = CARDS_NUMBERS.indexOf(actualCard);
  const nextCardIndex = (cardIndex + 1) % CARDS_NUMBERS.length;
  return CARDS_NUMBERS[nextCardIndex];
};
