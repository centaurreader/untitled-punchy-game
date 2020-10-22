import React, {
  useEffect,
  useState,
} from 'react';
import { RouteComponentProps  } from 'react-router';
import { DndProvider, } from 'react-dnd';
import { HTML5Backend, } from 'react-dnd-html5-backend';
import { db } from '../services/Database';

// temp
import GameBox from '../components/GameBox';
import ComponentMenu from '../components/ComponentMenu';
import PlayersMenu from '../components/PlayersMenu';
import MainMenu from '../components/MainMenu';
import Table from '../components/Table';
import Draggable from '../components/Draggable';
import DiceComponent from '../components/DiceComponent';

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
  const [contextMenuPosition, setContextMenuPosition] = useState<DraggablePosition>({ x: 0, y: 0 });
  const [playerId, setPlayerId] = useState<string>(state.playerId);
  const [game, setGame] = useState<Game | undefined>(undefined);
  const [isComponentsOpen, setIsComponentsOpen] = useState<boolean>(false);
  const [isPlayersOpen, setIsPlayersOpen] = useState<boolean>(false);

  useEffect(() => {
    function documentDataToGame(documentData: firebase.firestore.DocumentData): Game {
      const data = documentData.data() || {};
      return {
        currentPlayer: data.currentPlayer,
        currentTurn: data.currentTurn,
        players: data.players,
        box: data.box,
        table: { items: [ { id: '1', position: { x: 20, y: 30, }, }], },
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
        table: { items: [], },
      };
      docRef.update(updatedGame);
    });
  };

  const moveItem = (toMove: Draggable) => {
    console.log(toMove);
    setGame((state) => ({
      currentPlayer: state ? state.currentPlayer : '',
      currentTurn: state ? state.currentTurn : 0,
      players: state ? state.players : [],
      box: state ? state.box : null,
      table: { items: [
        ...(state
          ? state.table.items.map((item) => item.id === toMove.id ? toMove : item)
          : []),
      ], },
    }));
  };

  if (!game) {
    return null;
  }

  return (
    <>
      <MainMenu
        endTurn={endTurn}
        gameId={id}
        openPlayersMenu={() => { setIsPlayersOpen(true); }}
        currentPlayer={game.players.find(player => player.id === game.currentPlayer)}
        playerId={playerId}
      />
      <h1>{game.box ? game.box.name : ''}</h1>
      <div className="game_zone">
        <div className="game_zone--main">
          <GameBox component={game.box} />
          <DndProvider backend={HTML5Backend}>
            <Table
              onDrop={moveItem}
              onClick={(position: DraggablePosition) => {
                setContextMenuPosition(isComponentsOpen ? contextMenuPosition : position);
                setIsComponentsOpen(state => !state);
              }}
            >
              {game.table ? game.table.items.map((item) => (
                <Draggable key={item.id} id={item.id} position={item.position}>
                  <div>
                    test
                  </div>
                </Draggable>
              )) : null}
            </Table>
          </DndProvider>
        </div>
        <div className="game_zone--sidebar">
          <ComponentMenu
            closeMenu={() => { setIsComponentsOpen(false); }}
            game={game.box}
            isOpen={isComponentsOpen}
            position={contextMenuPosition}
          />
          {isPlayersOpen
            ? <PlayersMenu game={game} playerId={playerId} closeMenu={() => { setIsPlayersOpen(false); }} />
            : null}
        </div>
      </div>
    </>
  );
};

export default Game;
