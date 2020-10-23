import { nanoid } from 'nanoid';
import React from 'react';
import { Content, } from './ComponentMenu';

const ComponentMenuListItem: React.FC<{
  addItem: (item: TableItem) => void;
  componentGroup: ComponentGroup|Component;
  onSelect: (content: Content) => void;
  type: ComponentTypes;
}> = ({ addItem, componentGroup, onSelect, type, }) => {
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
        },
        id: nanoid(),
        componentType: type,
      });
  };

  return (
    <li>
      <button
        type="button"
        className="context_menu--selection"
        onClick={toggleGroup}
      >
        {componentGroup.name}
      </button>
    </li>
  );
};

export default ComponentMenuListItem;
