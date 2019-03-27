import {Subject} from 'rxjs';
import {WAITING_PLAYERS} from './consts';
import {createPlayers, getFirstCard, getNextCard} from './util';


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

  respondToInput = data => {
    if (data.key === this.state.players[this.state.turnIndex].keyDraw) {
        this.drawInput();
        return;
    }

    const handPlayerArr = this.state.players.filter(a => data.key === a.keyHand);
    if (handPlayerArr.length > 0) {
      const handPlayer = handPlayerArr[0];
      this.handInput(handPlayer);
    }
  }

  drawInput = () => {
    if (this.state.handPlayers.reduce((a, b) => a + b) > 0) {
      this.resetPile(this.state.turnIndex);
      return;
    }
    this.drawCard();
    this.subject.next(this.state);
  }

  handInput = player => {
    if (this.state.pile.length > 0) {
      if (this.state.pile.slice(-1).pop()[0] === this.state.cardCount) {
        this.state.handPlayers[this.state.players.indexOf(player)] = 1;
        if (this.state.handPlayers.reduce((a, b) => a + b) === this.state.handPlayers.length - 1) {
          const loserIndex = this.state.handPlayers.indexOf(0);
          this.resetPile(loserIndex);
        }
      } else {
        const handPlayerIndex = this.state.players.indexOf(player);
        this.resetPile(handPlayerIndex);
      }
    }
  }

  resetPile = playerIndex => {
    const player = this.state.players[playerIndex];
    player.mergePileToStock(this.state.pile);
    this.state.pile = [];
    this.state.cardCount = getFirstCard();
    this.state.handPlayers.fill(0);
    this.state.turnIndex = playerIndex;
    this.subject.next(this.state);
  }


  subscribe = (f) => this.observable.subscribe(f);

  pipe = (f) => this.observable.pipe(f);
}
