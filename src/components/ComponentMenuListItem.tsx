import { nanoid } from 'nanoid';
import React from 'react';
import { Content, } from './ComponentMenu';

const ComponentMenuListItem: React.FC<{
  addItem: (item: TableItem) => void;
  componentGroup: ComponentGroup|Component;
  onSelect: (content: Content) => void;
  type?: ComponentTypes;
  table: Table;
}> = ({ addItem, componentGroup, onSelect, type, table, }) => {
  const toggleGroup = () => {
    "components" in componentGroup
      ? onSelect({
        content: componentGroup.components,
        type: componentGroup.type,
        id: nanoid(),
      })
      : addItem({
        component: componentGroup,
        position: {
          x: 0,
          y: 0,
          z: 1,
        },
        id: nanoid(),
        componentType: type || null,
        componentId: componentGroup.id,
        value: type === 'Cards' ? componentGroup.name : '1',
      });
  };

  const isUnlimitedQuantity = () => "quantity" in componentGroup && componentGroup.quantity.toString() === '-1';
  const isInStock = () => "quantity" in componentGroup && componentGroup.quantity > table.items.filter(i => i.componentId === componentGroup.id && i.componentType === type).length;

  const isSelectable = () =>
    "quantity" in componentGroup
      ? isUnlimitedQuantity() || isInStock()
      : true;

  return (
    <li>
      <button
        className="context_menu--selection"
        disabled={!isSelectable()}
        onClick={toggleGroup}
        type="button"
      >
        {componentGroup.name}
      </button>
    </li>
  );
};

export default ComponentMenuListItem;
