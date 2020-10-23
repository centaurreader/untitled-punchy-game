import { nanoid } from 'nanoid';
import React from 'react';

const ComponentMenuListItem: React.FC<{
  addItem: (item: TableItem) => void;
  componentGroup: ComponentGroup|Component;
  onSelect: (componentGroup: Array<ComponentGroup|Component>) => void;
}> = ({ addItem, componentGroup, onSelect, }) => {
  const toggleGroup = () => {
    "components" in componentGroup
      ? onSelect(componentGroup.components)
      : addItem({
        component: componentGroup,
        position: {
          x: 0,
          y: 0,
        },
        id: nanoid(),
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
