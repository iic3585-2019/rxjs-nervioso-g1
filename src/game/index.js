import {Subject} from 'rxjs';
import {PLAYING, WAITING_PLAYERS, WAITING_THROW} from './consts';
import {createPlayers, getFirstCard, getNextCard} from './util';


export default class Game {
  state = {
    status: WAITING_PLAYERS,
    players: [],
    pile: [],
    turnIndex: 0,
    cardCount: 'K'
  };

  constructor() {
    this.subject = new Subject();
    this.observable = this.subject.asObservable();
  }

  start = () => {
    this.state.players = createPlayers();
    this.state.status = WAITING_THROW;
    this.subject.next(this.state);
  };

  drawCard = () => {
    const {turnIndex, players, status} = this.state;

    if (status === WAITING_THROW) {
      this.state.status = PLAYING;
    }
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
    if (this.state.players.map(player => player.hand).filter(e => e !== -1).length > 0) {
      this.resetPile(this.state.turnIndex);
      return;
    }
    this.drawCard();
    this.subject.next(this.state);
  }

  handInput = player => {
    if (player.hand !== -1) return;
    if (this.state.pile.length > 0) {
      const card = this.state.pile.slice(-1).pop();
      const cardNumber = card.includes("10") ? "10" : card[0];
      if (cardNumber === this.state.cardCount) {
        const number = Math.max(...this.state.players.map(player => player.hand), 0);
        player.hand = number + 1;
        if (player.hand === this.state.players.length) {
          const loserIndex = this.state.players.indexOf(player);
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
    this.state.status = WAITING_THROW;
    this.state.pile = [];
    this.state.cardCount = 'K';
    this.state.players.forEach(player => player.hand = -1);
    this.state.turnIndex = playerIndex;
    this.subject.next(this.state);
  }


  subscribe = (f) => this.observable.subscribe(f);

  pipe = (f) => this.observable.pipe(f);
}
