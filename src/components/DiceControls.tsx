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
  const getFacesFromProperties = (): Array<string> => 'properties' in item.component
    ? item.component.properties.find(p => p.name === 'faces')?.value as Array<string>
    : [];

  const getFaceValueByIndex = (index: number) => getFacesFromProperties()[index - 1];

  const roll = (event: React.MouseEvent) => {
    event.stopPropagation();
    const random = new Random();
    updateItem({
      ...item,
      value: '🔄',
    });
    setTimeout(() => updateItem({
      ...item,
      value: getFaceValueByIndex(random.integer(1, 8)),
    }), 300);
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
