import React from 'react';

interface Props 
{
  endTurn: Function;
  game: Game;
  playerId: string;
}

const Game: React.FC<Props> = ({
  endTurn,
  game,
  playerId,
}) => {
  return (
    <section>
      <h2>Players</h2>
      <ul>
        {game.players.map((player: Player) => (
          <li key={player.id}>
            {game.currentPlayer === playerId ? `You (${player.name})` : player.name}
            {game.currentPlayer === player.id ? (' [Turn]') : null}
          </li>
        ))}
      </ul>
      <button type="button" onClick={endTurn}>End Turn</button>
    </section>
  );
};

export default Game;
