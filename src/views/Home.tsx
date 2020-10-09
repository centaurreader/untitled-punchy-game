import React, {
  FormEvent,
  useState,
} from 'react';
import { RouteComponentProps  } from 'react-router';
import { nanoid } from 'nanoid';
import { db } from '../services/Database';

const Home: React.FunctionComponent<RouteComponentProps<any>> = ({
  history,
}) => {
  const [gameId, setGameId] = useState('');
  const [name, setName] = useState('');

  const joinGame = (event: FormEvent) => {
    event.preventDefault();

    if (!name || !gameId) {
      alert('need a name and a game id');
    }
    const docRef = db.collection('games').doc(gameId);
    docRef.get().then((doc) => {
      const data = doc.data() ?? {};
      const game: Game = {
        currentPlayer: data.currentPlayer,
        currentTurn: data.currentTurn,
        players: [
          ...data.players,
          { name, id: nanoid(), },
        ],
      };
      docRef.update(game).then(() => {
        history.push(`/games/${doc.id}`);
      });
    })
  };

  const createGame = (event: React.MouseEvent) => {
    event.preventDefault();

    if (!name) {
      alert('need a name');
    }
    const player = {
      name,
      id: nanoid(),
    };
    const game: Game = {
      currentPlayer: player.id,
      currentTurn: 0,
      players: [player],
    };
    db.collection('games').add(game)
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
