import {Subject} from 'rxjs';
import {WAITING_PLAYERS} from './consts';
import {createPlayers, getNextCard} from './util';


export default class Game {
  state = {
    status: WAITING_PLAYERS,
    players: createPlayers(),
    pile: [],
    turnIndex: 0,
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

  drawCard = () => {
    const {turnIndex, players} = this.state;
    const player = players[turnIndex];
    const card = player.drawCard();
    this.state.pile.push(card);

    this.endTurn();
  }

  endTurn = () => {
    const {turnIndex, players, actualCard} = this.state;

    this.state.turnIndex = (turnIndex + 1) % players.length;
    this.state.actualCard = getNextCard(actualCard);

    this.subject.next(this.state);
  }


  subscribe = (f) => this.observable.subscribe(f);

  pipe = (f) => this.observable.pipe(f);
}
