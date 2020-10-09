import React, {
  useEffect,
  useState,
} from 'react';
import { RouteComponentProps  } from 'react-router';
import CharacterCard from '../components/CharacterCard';
import { db } from '../services/Database';

interface MatchParams {
  id: string;
}
interface Props extends RouteComponentProps<MatchParams> {}

const Game: React.FunctionComponent<Props> = ({
  match: {
    params: {
      id,
    },
  },
}) => {
  const [game, setGame] = useState<Game | undefined>(undefined);

  useEffect(() => {
    function documentDataToGame(documentData: firebase.firestore.DocumentData): Game {
      const data = documentData.data() || {};
      return {
        currentPlayer: data.currentPlayer,
        currentTurn: data.currentTurn,
        players: data.players,
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
      docRef.update({
        currentPlayer: nextPlayer.id,
        currentTurn: isRoundOver ? (data.currentTurn + 1) : data.currentTurn,
      });
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
          <section>
            <h2>Play Area</h2>
            <CharacterCard
              name="Mutant Man"
              health="21"
              moves={[]}
            />
          </section>
        </div>
        <div className="game_zone--sidebar">
          <section>
            <h2>Players</h2>
            <ul>
              {game.players.map((player: Player) => (
                <li key={player.id}>
                  {player.name}{game.currentPlayer === player.id ? (' [Turn]') : null}
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
