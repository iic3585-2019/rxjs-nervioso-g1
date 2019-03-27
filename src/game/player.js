export default class Player {
  constructor(name, keyHand, keyDraw) {
    this.stock = [];
    this.name = name;
    this.keyDraw = keyDraw;
    this.keyHand = keyHand;
    this.hand = -1;
    this.won = false;
  }

  addCardToStock = (card) => {
    this.stock.push(card);
  }

  mergePileToStock = (pile) => {
    this.stock = pile.reverse().concat(this.stock);
  }

  drawCard = () => this.stock.pop()
}
