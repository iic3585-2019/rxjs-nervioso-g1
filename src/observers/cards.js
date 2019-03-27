import {PLAYING, WAITING_THROW} from '../game/consts';

export const updateCardCount = ([cardCount, status]) => {
  if (status === WAITING_THROW) {
    document.getElementById('card-count').innerHTML = 'Esperando';
  } else if (status === PLAYING) {
    document.getElementById('card-count').innerHTML =
      `Contador de cartas: ${cardCount}`;
  } else {
    document.getElementById('card-count').innerHTML = 'WTF';
  }
};

export const updateNewCard = (pile) => {
  const card = pile[pile.length-1];
  if (card) {
    document.getElementById('new-card').innerHTML =
        `<img class='card' src='/cards/${card}.svg' width='150'/>`;
  } else {
    document.getElementById('new-card').innerHTML = '';
  }
};
