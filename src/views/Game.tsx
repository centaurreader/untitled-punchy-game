import React, {
  useCallback,
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

const debounce = <T extends (...args: any[]) => any>(fn: T, wait: number) => {
  let timeout: number = 0;
  const debounced = (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), wait);
  };
  return debounced as (...args: Parameters<T>) => ReturnType<T>;
};

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
  const [contextMenuPosition, setContextMenuPosition] = useState<DraggablePosition>({ x: 0, y: 0, z: 0, });
  const [playerId, _] = useState<string>(state?.playerId);
  const [game, setGame] = useState<Game | undefined>(undefined);
  const [isComponentsOpen, setIsComponentsOpen] = useState<boolean>(false);
  const [isPlayersOpen, setIsPlayersOpen] = useState<boolean>(false);
  const [isAnotherMenuOpen, setIsAnotherMenuOpen] = useState(false);
  const [multiSelectEnabled, setMultiSelectEnabled] = useState(false);

  useEffect(() => {
    function handleKeyDown(ev: KeyboardEvent) {
      if (ev.key === 'Shift') {
        setMultiSelectEnabled(true);
      }
    }
    function handleKeyUp(ev: KeyboardEvent) {
      if (ev.key === 'Shift') {
        setMultiSelectEnabled(false);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    function documentDataToGame(documentData: firebase.firestore.DocumentData): Game {
      const data = documentData.data() || {};
      return {
        currentPlayer: data.currentPlayer,
        currentTurn: data.currentTurn,
        players: data.players,
        box: data.box,
        table: { items: data.table.items || [], },
      };
    }

    const docRef = db.collection('games').doc(id);
    docRef.get().then((doc: firebase.firestore.DocumentData) => {
      setGame(documentDataToGame(doc));
    });
    docRef.onSnapshot((doc: firebase.firestore.DocumentData) => {
      setGame(documentDataToGame(doc));
    });
  }, []);

  useEffect(() => {
    updateGame(game);
  }, [game]);

  const updateGame = useCallback(
    debounce((gameUpdate) => {
      const docRef = db.collection('games').doc(id);
      docRef.update(gameUpdate || {});
    }, 125),
    []
  );

  const endTurn = () => {
    const docRef = db.collection('games').doc(id);
    docRef.get().then((doc: firebase.firestore.DocumentData) => {
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

  const updateItem = (item: TableItem) => {
    setGame((state) => ({
      currentPlayer: state ? state.currentPlayer : '',
      currentTurn: state ? state.currentTurn : 0,
      players: state ? state.players : [],
      box: state ? state.box : null,
      table: { items: [
        ...(state
          ? state.table.items.map((i) => i.id === item.id ? item : i)
          : [])
      ], },
    }));
  };

  const removeItem = (item: TableItem) => {
    setGame((state) => ({
      currentPlayer: state ? state.currentPlayer : '',
      currentTurn: state ? state.currentTurn : 0,
      players: state ? state.players : [],
      box: state ? state.box : null,
      table: { items: [
        ...(state
          ? state.table.items.filter((i) => i.id !== item.id)
          : [])
      ], },
    }));
  };

  const selectItem = (item: TableItem|null) => {
    if (!item) {
      return;
    }
    setIsComponentsOpen(false);

    const player = game?.players.find(p => p.id === playerId);
    if (!player) {
      return;
    }
    const alreadySelected = game?.players.some((p) =>
      p.selection?.some(s => s.componentId === item.id));
    if (alreadySelected) {
      return;
    }
    
    setGame(state => (state ? {
      ...state,
      players: state?.players.map(p => p.id === playerId ? {
        ...player,
        selection: [
          ...((multiSelectEnabled && p.selection) || []),
          { componentId: item.id, },
        ],
      } : p),
    } : undefined));
  }

  const selectItems = (items: Array<TableItem|undefined>) => {
    const player = game?.players.find(p => p.id === playerId);
    if (!player) {
      return;
    }
    const updatedSelections: Array<ItemSelection> = items.filter((item: TableItem|undefined) => item).map((item) => ({ componentId: item?.id || '', }));
    if (JSON.stringify(updatedSelections) === JSON.stringify(player.selection)) {
      return;
    }
    setGame(state => (state ? {
      ...state,
      players: state?.players.map(p => p.id === playerId ? {
        ...player,
        selection: updatedSelections,
      } : p),
    } : undefined));
  };

  const resetSelections = () => {
    const player = game?.players.find(p => p.id === playerId);
    if (!player) {
      return false;
    }
    if (!player.selection?.length) {
      return false;
    }
    setGame(state => (state ? {
      ...state,
      players: state?.players.map(p => p.id === playerId ? {
        ...player,
        selection: [],
      } : p),
    } : undefined));
    return true;
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
          items={game.table.items}
          onDrop={updateItem}
          onClick={(position: DraggablePosition) => {
            if (resetSelections()) {
              return;
            }
            if (!isAnotherMenuOpen) {
              setContextMenuPosition(isComponentsOpen ? contextMenuPosition : position);
              setIsComponentsOpen(state => !state);
            } else {
              setIsAnotherMenuOpen(false);
            }
          }}
          // onSelection={debounce(selectItems, 10)}
          onSelection={selectItems}
        >
          {game.table ? game.table.items.map((item) => (
            <Draggable
              key={item.id}
              item={item}
            >
              <Component
                isSelected={game.players.some(p => p.selection?.find(s => s.componentId === item.id))}
                item={item}
                name={item.component.name}
                onOpen={() => {
                  setIsComponentsOpen(false);
                  setIsAnotherMenuOpen(true);
                }}
                removeItem={() => removeItem(item)}
                selectColor={game.players.find(player => player.id === game.currentPlayer)?.color}
                selectItem={selectItem}
                type={item.componentType}
                updateItem={updateItem}
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
            table={game.table}
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
