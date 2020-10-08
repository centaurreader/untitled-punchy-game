import React, {
  useEffect,
  useState,
} from 'react';
import { db } from './services/Database';

const Game = ({
  match: {
    params: {
      id,
    },
  },
}) => {
  const [game, setGame] = useState(null);

  useEffect(() => {
    const docRef = db.collection('games').doc(id);
    docRef.get().then((doc) => {
      setGame(doc.data());
    });
    docRef.onSnapshot((doc) => {
      setGame(doc.data());
    });
  }, []);

  const endTurn = () => {
    const docRef = db.collection('games').doc(id);
    docRef.get().then((doc) => {
      const players = doc.data().players;
      const currentPlayerIndex = players.indexOf(doc.data().currentTurn);
      const nextPlayer = players[currentPlayerIndex === (players.length - 1) ? 0 : currentPlayerIndex + 1];
      docRef.update({
        currentTurn: nextPlayer,
      });
    });
  }

  if (!game) {
    return null;
  }

  return (
    <>
      <h1>Game ID {id}</h1>
      <button type="button" onClick={endTurn}>End Turn</button>
      <section>
        <h2>Players</h2>
        <ul>
          {game.players.map((player) => (
            <li key={player}>
              {player}{game.currentTurn === player ? (' [Turn]') : null}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default Game;
