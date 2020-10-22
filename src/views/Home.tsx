import React, {
  FormEvent,
  useState,
} from 'react';
import { RouteComponentProps  } from 'react-router';
import { nanoid } from 'nanoid';
import { db } from '../services/Database';
import InputResourceFile from '../components/InputResourceFile';

const Home: React.FunctionComponent<RouteComponentProps<any>> = ({
  history,
}) => {
  const [box, setBox] = useState<null|Box>();
  const [gameId, setGameId] = useState('');
  const [joinName, setJoinName] = useState('');
  const [createName, setCreateName] = useState('');

  const redirectToGameInstance = (instanceId: string, playerId: string) => {
    history.push({
      pathname: `/games/${instanceId}`,
      state: {
        playerId,
      }
    });
  };

  const joinGame = (event: FormEvent) => {
    event.preventDefault();

    if (!joinName || !gameId) {
      alert('need a name and a game id');
      return;
    }
    const docRef = db.collection('games').doc(gameId);
    docRef.get().then((doc) => {
      const data = doc.data() ?? {};
      const playerId = nanoid();
      const game: Game = {
        currentPlayer: data.currentPlayer,
        currentTurn: data.currentTurn,
        players: [
          ...data.players,
          { name: joinName, id: playerId, },
        ],
        box: data.box,
        table: { items: [], },
      };
      docRef.update(game).then(() => {
        redirectToGameInstance(doc.id, playerId);
        history.push(`/games/${doc.id}`);
      });
    })
  };

  const createGame = (event: FormEvent) => {
    event.preventDefault();

    if (!createName) {
      alert('need a name');
      return;
    }
    if (!box) {
      alert('need a resource file');
    }
    const player = {
      name: createName,
      id: nanoid(),
    };
    const game: Game = {
      currentPlayer: player.id,
      currentTurn: 0,
      players: [player],
      box: box || { name: '', componentGroups: [], },
      table: { items: [], },
    };
    db.collection('games').add(game)
    .then((docRef) => {
      redirectToGameInstance(docRef.id, player.id);
    });
  };

  return (
    <>
      <h1>UPG Sandbox</h1>
      <form onSubmit={joinGame}>
        <h2>Join Game</h2>
        <label>
          Your Name
          <input onChange={(event) => setJoinName(event.target.value)} value={joinName} />
        </label>
        <label>
          Game ID
          <input onChange={(event) => setGameId(event.target.value)} value={gameId} />
        </label>
        <button type="submit">Join Game</button>
      </form>

      <form onSubmit={createGame}>
        <h2>Create Game</h2>
        <label>
          Your Name
          <input onChange={(event) => setCreateName(event.target.value)} value={createName} />
        </label>
        <InputResourceFile onLoad={(box: Box) => { setBox(box); }} />
        <button type="submit" onClick={createGame}>Create Game</button>
      </form>
    </>
  );
};

export default Home;
