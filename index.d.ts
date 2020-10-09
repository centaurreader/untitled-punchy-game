interface Player {
  name: string;
  id: string;
}

interface Game {
  players: Array<Player>;
  currentPlayer: Player.id;
  currentTurn: number;
}
