export default class Player {
  constructor(name, keyHand, keyDraw) {
    this.stock = [];
    this.name = name;
    this.keyDraw = keyDraw;
    this.keyHand = keyHand;
  }

  addCardToStock = (card) => {
    this.stock.push(card);
  }

  mergePileToStock = (pile) => {
    this.stock.concat(pile);
  }

  drawCard = () => this.stock.pop()
}
