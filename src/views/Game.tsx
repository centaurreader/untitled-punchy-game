import React, {
  useEffect,
  useState,
} from 'react';
import { RouteComponentProps  } from 'react-router';
import { db } from '../services/Database';

// temp
import GameBox from '../components/GameBox';
import ComponentMenu from '../components/ComponentMenu';
import PlayersMenu from '../components/PlayersMenu';

interface Props extends RouteComponentProps<
  {
    id: string;
  },
  any,
  {
    playerId: string;
  }
> {}

const Game: React.FunctionComponent<Props> = ({
  location: {
    state,
  },
  match: {
    params: {
      id,
    },
  },
}) => {
  const [playerId, setPlayerId] = useState<string>(state.playerId);
  const [game, setGame] = useState<Game | undefined>(undefined);

  useEffect(() => {
    function documentDataToGame(documentData: firebase.firestore.DocumentData): Game {
      const data = documentData.data() || {};
      return {
        currentPlayer: data.currentPlayer,
        currentTurn: data.currentTurn,
        players: data.players,
        box: data.box,
      };
    }

    const docRef = db.collection('games').doc(id);
    docRef.get().then((doc) => {
      setGame(documentDataToGame(doc));
    });
    docRef.onSnapshot((doc) => {
      setGame(documentDataToGame(doc));
    });
  }, []);

  const endTurn = () => {
    const docRef = db.collection('games').doc(id);
    docRef.get().then((doc) => {
      const data = doc.data();
      if (!data) {
        return;
      }
      const players = data.players;
      const currentPlayer = players.find((player: Player) => player.id === data.currentPlayer);
      const currentPlayerIndex = players.indexOf(currentPlayer);
      const isRoundOver = currentPlayerIndex === (players.length - 1);
      const nextPlayer = players[isRoundOver ? 0 : currentPlayerIndex + 1];
      const updatedGame: Game = {
        currentPlayer: nextPlayer.id,
        currentTurn: isRoundOver ? (data.currentTurn + 1) : data.currentTurn,
        players,
        box: data.box,
      };
      docRef.update(updatedGame);
    });
  };

  if (!game) {
    return null;
  }

  return (
    <>
      <h1>Game ID {id}</h1>
      <div className="game_zone">
        <div className="game_zone--main">
          <GameBox component={game.box} />
          <div style={{ height: '50vh', }}>
            Play Area
          </div>
        </div>
        <div className="game_zone--sidebar">
          <ComponentMenu game={game.box} />
          <PlayersMenu game={game} playerId={playerId} endTurn={endTurn} />
        </div>
      </div>
    </>
  );
};

export default Game;
