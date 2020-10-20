import React from 'react';

interface Props 
{
  game: Game;
  playerId: string;
  closeMenu: () => void;
}

const Game: React.FC<Props> = ({
  game,
  playerId,
  closeMenu,
}) => {
  return (
    <section className="modal">
      <h2>Players</h2>
      <button type="button" onClick={closeMenu}>close</button>
      <ul>
        {game.players.map((player: Player) => (
          <li key={player.id}>
            {game.currentPlayer === playerId ? `You (${player.name})` : player.name}
            {game.currentPlayer === player.id ? (' [Turn]') : null}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Game;
