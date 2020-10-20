import React, { useState } from 'react';

const ComponentMenuListItem: React.FC<any> = ({ componentGroup, }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleGroup = () => {
    setIsOpen(state => !state);
  };

  return (
    <li>
      <button
        type="button"
        onClick={toggleGroup}
      >
        {componentGroup.name}
      </button>
      <ul>
        {isOpen ? componentGroup.components.map((component: Component) => (
          <li key={component.id}>
            <button type="button">{component.name}</button>
          </li>
        )) : null}
      </ul>
    </li>
  );
};

export default ComponentMenuListItem;
