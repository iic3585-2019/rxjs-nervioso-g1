export const updateCardCount = (cardCount) => {
  document.getElementById('card-count').innerHTML =
      `Contador de cartas: ${cardCount}`;
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
