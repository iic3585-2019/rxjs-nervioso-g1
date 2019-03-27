export const updatePlayers = (game) => (players) => {
  document.getElementById('players').innerHTML = players.map(
      (player) => {
        const classNames = ['player-card'];
        if (player.won) {
          classNames.push('winner');
        }
        if (player.hand !== -1) {
          classNames.push('hand');
        } else {
          if (game.currentPlayer() === player) {
            classNames.push('turn');
          }
        }
        return `
        <div class="${classNames.join(' ')}">
            <div class="player-heading">
                ${player.name}
            </div>
            <div>
                Cartas restantes: ${player.stock.length}
            </div>
            <div class="keys">
                <div>
                  Draw: ${player.keyDraw.toUpperCase()}
                </div>
                <div>
                  Hand: ${player.keyHand.toUpperCase()}
                </div>
            </div>
        </div>`;
      }).join('');
};
