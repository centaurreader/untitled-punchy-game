import React from 'react';
import { Random } from 'random-js';

const DiceControls: React.FC<{
  closeMenu: () => void;
  item: TableItem;
  removeItem: () => void;
  updateItem: (i: TableItem) => void;
}> = ({
  closeMenu,
  item,
  removeItem,
  updateItem,
}) => {
  const roll = (event: React.MouseEvent) => {
    event.stopPropagation();
    const random = new Random();
    updateItem({
      ...item,
      value: random.integer(1, 8).toString(),
    });
    closeMenu();
  };

  return (
    <ul className="component_control_menu">
      <li>
        <button className="component_control" type="button" onClick={roll}>roll</button>
      </li>
      <li>
        <button className="component_control" type="button" onClick={removeItem}>discard</button>
      </li>
    </ul>
  );
};

export default DiceControls;
