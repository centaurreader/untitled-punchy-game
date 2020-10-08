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

  if (!game) {
    return null;
  }

  return (
    <>
      <h1>Game ID {id}</h1>
      <section>
        <h2>Players</h2>
        <ul>
          {game.players.map((player) => (
            <li key={player}>{player}</li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default Game;
