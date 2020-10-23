import React, {
  useEffect,
  useState,
} from 'react';
import { RouteComponentProps  } from 'react-router';
import { DndProvider, } from 'react-dnd';
import { HTML5Backend, } from 'react-dnd-html5-backend';
import { db } from '../services/Database';

import ComponentMenu from '../components/ComponentMenu';
import PlayersMenu from '../components/PlayersMenu';
import MainMenu from '../components/MainMenu';
import Table from '../components/Table';
import Draggable from '../components/Draggable';
import Component from '../components/Component';

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
        table: { items: [], },
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

  const addItem = (item: TableItem) => {
    setGame((state) => ({
      currentPlayer: state ? state.currentPlayer : '',
      currentTurn: state ? state.currentTurn : 0,
      players: state ? state.players : [],
      box: state ? state.box : null,
      table: { items: [
        ...state?.table?.items ?? [],
        item,
      ], },
    }));
  };

  const moveItem = (toMove: TableItem) => {
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
        title={game.box?.name ?? ''}
        openPlayersMenu={() => { setIsPlayersOpen(true); }}
        currentPlayer={game.players.find(player => player.id === game.currentPlayer)}
        playerId={playerId}
      />
      <DndProvider backend={HTML5Backend}>
        <Table
          onDrop={moveItem}
          onClick={(position: DraggablePosition) => {
            setContextMenuPosition(isComponentsOpen ? contextMenuPosition : position);
            setIsComponentsOpen(state => !state);
          }}
        >
          {game.table ? game.table.items.map((item) => (
            <Draggable
              key={item.id}
              item={item}
            >
              <Component
                name={item.component.name}
                type={item.componentType}
              />
            </Draggable>
          )) : null}
        </Table>
        <div className="game_zone--sidebar">
          <ComponentMenu
            addItem={addItem}
            game={game.box}
            isOpen={isComponentsOpen}
            position={contextMenuPosition}
          />
          {isPlayersOpen
            ? <PlayersMenu game={game} playerId={playerId} closeMenu={() => { setIsPlayersOpen(false); }} />
            : null}
        </div>
      </DndProvider>
    </>
  );
};

export default Game;
