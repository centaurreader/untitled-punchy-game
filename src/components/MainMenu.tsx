import React from 'react';

const MainMenu: React.FC<{
  currentPlayer: Player|undefined;
  endTurn: () => void,
  gameId: string;
  openPlayersMenu: () => void;
  playerId: string;
  title: string;
}> = ({
  currentPlayer = {},
  endTurn,
  gameId,
  openPlayersMenu,
  playerId,
  title,
}) => {
  return (
    <div className="main_menu">
      <div className="main_menu--control_row">
        <h1 className="main_menu--title">{title}</h1>
        <div>
          {currentPlayer.id === playerId
            ? (<button type="button" className="main_menu--control" onClick={endTurn}>End Turn</button>)
            : null}
          <button
            type="button"
            className="main_menu--control"
            onClick={openPlayersMenu}
          >
            Players
          </button>
        </div>
      </div>
      <div className="main_menu--info_row">
        Game ID: {gameId}<br />
        Current Player: {currentPlayer.name} {currentPlayer.id === playerId ? '(You)' : null}
      </div>
    </div>
  );
};

export default MainMenu;
