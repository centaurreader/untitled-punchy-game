import React, {
  useEffect,
  useState,
} from 'react';
import CharacterCard from '../components/CharacterCard';
import { db } from '../services/Database';

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
      const currentPlayer = players.find((player) => player.id === game.currentTurn);
      const currentPlayerIndex = players.indexOf(currentPlayer);
      const nextPlayer = players[currentPlayerIndex === (players.length - 1) ? 0 : currentPlayerIndex + 1];
      docRef.update({
        currentTurn: nextPlayer.id,
      });
    });
  }

  if (!game) {
    return null;
  }

  return (
    <>
      <h1>Game ID {id}</h1>
      <div className="game_zone">
        <div className="game_zone--main">
          <section>
            <h2>Play Area</h2>
            <CharacterCard />
          </section>
        </div>
        <div className="game_zone--sidebar">
          <section>
            <h2>Players</h2>
            <ul>
              {game.players.map((player) => (
                <li key={player.id}>
                  {player.name}{game.currentTurn === player.id ? (' [Turn]') : null}
                </li>
              ))}
            </ul>
            <button type="button" onClick={endTurn}>End Turn</button>
          </section>
        </div>
      </div>
    </>
  );
};

export default Game;
