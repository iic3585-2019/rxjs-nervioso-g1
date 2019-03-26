import {Subject} from 'rxjs';
import {WAITING_PLAYERS} from './consts';


export default class Game {
  state = {
    status: WAITING_PLAYERS,
    players: [],
  };

  constructor() {
    this.subject = new Subject();
    this.observable = this.subject.asObservable();
  }

  addPlayer = (name) => {
    this.state.players.push({
      name,
    });
    this.subject.next(this.state);
  };

  subscribe = (f) => this.observable.subscribe(f);

  pipe = (f) => this.observable.pipe(f);
}
