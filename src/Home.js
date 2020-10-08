import React, {
  useState,
} from 'react';
import { db } from './services/Database';

const Home = ({
  history,
}) => {
  const [gameId, setGameId] = useState('');
  const [name, setName] = useState('');

  const joinGame = (event) => {
    event.preventDefault();

    if (!name || !gameId) {
      alert('need a name and a game id');
    }
    const docRef = db.collection('games').doc(gameId);
    docRef.get().then((doc) => {
      docRef.update({
        players: [
          ...doc.data().players,
          name,
        ],
      }).then(() => {
        history.push(`/games/${doc.id}`);
      });
    })
  };

  const createGame = (event) => {
    event.preventDefault();

    if (!name) {
      alert('need a name');
    }
    db.collection('games').add({
      currentTurn: name,
      players: [
        name,
      ],
    })
    .then((docRef) => {
      history.push(`/games/${docRef.id}`);
    });
  };

  return (
    <>
      <h1>Start or Join Game</h1>
      <form onSubmit={joinGame}>
        <label>
          Name
          <input onChange={(event) => setName(event.target.value)} value={name} />
        </label>
        <label>
          Game ID
          <input onChange={(event) => setGameId(event.target.value)} value={gameId} />
        </label>
        <button type="submit">Join Game</button>
        <button type="button" onClick={createGame}>Create Game</button>
      </form>
    </>
  );
};

export default Home;
