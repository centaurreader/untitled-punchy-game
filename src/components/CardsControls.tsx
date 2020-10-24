import React from 'react';

const CardsControls: React.FC<{
  closeMenu: () => void;
  item: TableItem;
  removeItem: () => void;
  updateItem: (i: TableItem) => void;
}> = ({
  removeItem,
}) => {
  return (
    <ul className="component_control_menu">
      <li>
        <button className="component_control" type="button" onClick={removeItem}>discard</button>
      </li>
    </ul>
  );
};

export default CardsControls;
