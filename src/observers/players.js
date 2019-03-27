export const updatePlayers = (players) => {
  document.getElementById('players').innerHTML = players.map(
      (player) =>
        `Nombre: ${player.name} <br/> Cartas restantes: ${player.stock.length} <br/> Gano: ${player.won}`)
      .join('<br/>');
};
