import {Subject} from 'rxjs';
import {WAITING_PLAYERS, CARDS_NUMBERS} from './consts';
import {createPlayers} from './util';


export default class Game {
  state = {
    status: WAITING_PLAYERS,
    players: createPlayers(),
    pile: [],
    playerTurn: 0,
    actualCard: 'A',
  };

  constructor() {
    this.subject = new Subject();
    this.observable = this.subject.asObservable();
  }

  // TODO: remove
  addPlayer = (name) => {
    this.state.players.push({
      name,
    });
    this.subject.next(this.state);
  };

  endTurn = () => {
    const {playerTurn, players, actualCard} = this.state;
    this.state.playerTurn = (playerTurn + 1) % players.length;

    const cardIndex = CARDS_NUMBERS.indexOf(actualCard);
    const nextCardIndex = (cardIndex + 1) % CARDS_NUMBERS.length;
    this.actualCard = CARDS_NUMBERS[nextCardIndex];

    this.subject.next(this.state);
  }


  subscribe = (f) => this.observable.subscribe(f);

  pipe = (f) => this.observable.pipe(f);
}
