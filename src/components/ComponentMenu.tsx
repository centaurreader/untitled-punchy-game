import React from 'react';
import ComponentMenuListItem from './ComponentMenuListItem';

const ComponentMenu: React.FC<{
  closeMenu: () => void;
  game: Box | null;
  isOpen: boolean;
  position: DraggablePosition;
}> = ({ closeMenu, game, isOpen, position, }) => {
  return (
    <section
      className={`context_menu ${isOpen ? 'context_menu-open' : undefined}`}
      style={{ left: position.x, top: position.y, }}
    >
      <h2>Components</h2>
      <ul>
        {game && game.componentGroups.map((componentGroup: ComponentGroup) => (
          <ComponentMenuListItem
            componentGroup={componentGroup}
            key={componentGroup.id}
          />
        ))}
      </ul>
    </section>
  );
};

export default ComponentMenu;
