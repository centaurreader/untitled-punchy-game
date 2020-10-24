import React from 'react';
import { Random } from 'random-js';

const DiceControls: React.FC<{
  closeMenu: () => void;
}> = ({
  closeMenu,
}) => {
  const roll = (event: React.MouseEvent) => {
    event.stopPropagation();
    const random = new Random();
    console.log(random.integer(1, 8));
    closeMenu();
  };

  return (
    <ul className="component_control_menu">
      <li>
        <button className="component_control" type="button" onClick={roll}>roll</button>
      </li>
    </ul>
  );
};

export default DiceControls;
