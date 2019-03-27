export const WAITING_PLAYERS = 'WAITING_PLAYERS';
export const WAITING_THROW = 'WAITING_THROW';
export const PLAYING = 'PLAYING';
export const FINISH = 'FINISH';

export const CARDS_NUMBERS =
    ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

export const DECK = ['H', 'S', 'C', 'D']
    .map((type) => [...CARDS_NUMBERS].map((card) => card + type))
    .flat();
