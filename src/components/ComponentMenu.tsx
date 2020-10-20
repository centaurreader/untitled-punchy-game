import React from 'react';
import ComponentMenuListItem from './ComponentMenuListItem';

const ComponentMenu: React.FC<{
  game: Box;
  closeMenu: () => void;
}> = ({ game, closeMenu, }) => {
  return (
    <section className="modal">
      <h2>Components</h2>
      <button type="button" onClick={closeMenu}>close</button>
      <ul>
        {game.componentGroups.map((componentGroup: ComponentGroup) => (
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
