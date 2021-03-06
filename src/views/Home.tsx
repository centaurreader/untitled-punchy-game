import React, {
  FormEvent,
  useState,
} from 'react';
import { Random } from 'random-js';
import { RouteComponentProps  } from 'react-router';
import { nanoid } from 'nanoid';
import { db } from '../services/Database';
import InputResourceFile from '../components/InputResourceFile';
import Auth from '../services/Auth';
import authHoc from '../higherOrderComponents/auth.hoc';

interface Props extends RouteComponentProps<any> {
  updateAuthState: (s: boolean) => void;
}

const Home: React.FC<Props> = ({
  history,
  updateAuthState,
}) => {
  const [box, setBox] = useState<null|Box>();
  const [gameId, setGameId] = useState('');
  const [joinName, setJoinName] = useState('');
  const [createName, setCreateName] = useState('');

  const createPlayer = (name: string): Player => {
    function getColor() {
      return new Random().integer(0, 255);
    }
    return {
      name,
      id: Auth.getCurrentUser().uid,
      selection: [],
      color: `rgb(${getColor()}, ${getColor()}, ${getColor()})`,
    };
  };

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
    docRef.get().then((doc: firebase.firestore.DocumentData) => {
      const data = doc.data() ?? {};
      const player = createPlayer(joinName);
      const game: Game = {
        currentPlayer: data.currentPlayer,
        currentTurn: data.currentTurn,
        players: [
          ...data.players,
          player,
        ],
        playerIds: [player.id],
        box: data.box,
        table: { items: [], },
      };
      docRef.update(game).then(() => {
        redirectToGameInstance(doc.id, player.id);
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
      return;
    }
    const player = createPlayer(createName);
    const game: Game = {
      currentPlayer: player.id,
      currentTurn: 0,
      players: [player],
      playerIds: [player.id],
      box: box || { name: '', componentGroups: [], },
      table: { items: [], },
    };
    db.collection('games').add(game)
    .then((docRef: firebase.firestore.DocumentData) => {
      redirectToGameInstance(docRef.id, player.id);
    }).catch(() => {
      console.log('wut');
    });
  };

  const signOut = () => {
    Auth.signOut();
    updateAuthState(false);
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

      <button type="button" onClick={signOut}>Sign Out</button>
    </>
  );
};

export default authHoc(Home);
