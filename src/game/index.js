import {Subject} from 'rxjs';
import {WAITING_PLAYERS} from './consts';
import {createPlayers, getNextCard} from './util';


export default class Game {
  state = {
    status: WAITING_PLAYERS,
    players: createPlayers(),
    pile: [],
    turnIndex: 0,
    cardCount: 'K',
    handPlayers: [],
  };

  constructor() {
    this.subject = new Subject();
    this.observable = this.subject.asObservable();
  }

  drawCard = () => {
    const {turnIndex, players} = this.state;
    const player = players[turnIndex];
    const card = player.drawCard();
    this.state.pile.push(card);

    this.endTurn();
  }

  endTurn = () => {
    const {turnIndex, players, cardCount} = this.state;

    this.state.turnIndex = (turnIndex + 1) % players.length;
    this.state.cardCount = getNextCard(cardCount);

    this.subject.next(this.state);
  }

  genHandPlayers = () => {
    this.state.handPlayers = new Array(this.state.players.length).fill(0);
  }


  subscribe = (f) => this.observable.subscribe(f);

  pipe = (f) => this.observable.pipe(f);
}
