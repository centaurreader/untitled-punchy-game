import React from 'react';

const Game = ({
  match: {
    params: {
      id,
    },
  },
}) => {
  return (
    <>
      <h1>Game ID {id}</h1>
      <p>Current turn: [player name]</p>
      <section>
        <h2>Players</h2>
        <ul>
          <li>[player name]</li>
        </ul>
      </section>
    </>
  );
};

export default Game;
