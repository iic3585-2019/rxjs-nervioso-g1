export const WAITING_PLAYERS = 'WAITING-PLAYERS';

export const CARDS_NUMBERS =
    ['A', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

export const DECK = ['H', 'S', 'C', 'D']
    .map((type) => [...CARDS_NUMBERS].map((card) => card + type))
    .flat();
