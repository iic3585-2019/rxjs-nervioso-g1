import {Subject} from 'rxjs';
import {FINISH, PLAYING, WAITING_PLAYERS, WAITING_THROW} from './consts';
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

  currentPlayers = () => this.state.players.filter(player => !player.won);

  playerHaveHand = () => this.state.players.map(player => player.hand).filter(e => e !== -1).length > 0;

  start = () => {
    this.state.players = createPlayers();
    this.state.status = WAITING_THROW;
    this.subject.next(this.state);
  };


  respondToInput = data => {
    const {status} = this.state;
    if (status === FINISH) return;

    if (data.key === this.state.players[this.state.turnIndex].keyDraw) {
      this.drawCard();
    } else {
      const handPlayerArr = this.state.players.filter(a => data.key === a.keyHand);
      if (handPlayerArr.length > 0) {
        const handPlayer = handPlayerArr[0];
        if (!handPlayer.won && handPlayer.hand === -1) this.playerHand(handPlayer);
      }
    }
  }

  drawCard = () => {
    const {turnIndex, players, status} = this.state;

    if (players[turnIndex].stock.length === 0){
      this.endGame();
      return;
    }

    if (this.playerHaveHand()) {
      this.resetPile(this.state.turnIndex);
      return;
    }

    if (status === WAITING_THROW) {
      this.state.status = PLAYING;
    }

    const player = players[turnIndex];
    const card = player.drawCard();
    this.state.pile.push(card);
    this.endTurn();
  }

  endTurn = () => {
    const {turnIndex, cardCount, players} = this.state;
    let nextPlayerIndex = (turnIndex + 1) % players.length;
    if (players.filter(player => player.stock.length > 0).length === 0) {
      nextPlayerIndex = turnIndex;
    } else {
      while (players[nextPlayerIndex].stock.length === 0) {
        nextPlayerIndex = (nextPlayerIndex + 1) % players.length;
      }
    }
    this.state.turnIndex = nextPlayerIndex;
    this.state.cardCount = getNextCard(cardCount);
    this.subject.next(this.state);
  }

  playerHand = player => {
    const players = this.currentPlayers();
    if (this.state.pile.length > 0) {
      const card = this.state.pile.slice(-1).pop();
      const cardNumber = card.includes("10") ? "10" : card[0];
      if (cardNumber === this.state.cardCount) {
        const number = Math.max(...players.map(player => player.hand), 0);
        player.hand = number + 1;
        if (player.hand === players.length) {
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
    const {players} = this.state;
    const player = this.state.players[playerIndex];
    player.mergePileToStock(this.state.pile);
    players.filter(player => player.stock.length === 0).forEach(player => player.won = true);
    if (players.filter(player => !player.won).length === 1) {
      this.state.status = FINISH;
      this.state.pile = [];
      this.state.cardCount = 'K';
      this.state.players.forEach(player => player.hand = -1);
      this.state.turnIndex = playerIndex;
    } else {
      this.state.status = WAITING_THROW;
      this.state.pile = [];
      this.state.cardCount = 'K';
      this.state.players.forEach(player => player.hand = -1);
      this.state.turnIndex = playerIndex;
    }
    this.subject.next(this.state);
  }

  endGame = () => {
    this.state.status = FINISH;
    this.subject.next(this.state);
  };

  subscribe = (f) => this.observable.subscribe(f);

  pipe = (f) => this.observable.pipe(f);
}
