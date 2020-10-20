import React from 'react';
import ComponentMenuListItem from './ComponentMenuListItem';

const ComponentMenu: React.FC<{
  game: Box;
}> = ({ game, }) => {
  return (
    <section>
      <h2>Components</h2>
      <ul>
        {game.componentGroups.map((componentGroup: ComponentGroup) => (
          <ComponentMenuListItem
            componentGroup={componentGroup}
            key={componentGroup.name}
          />
        ))}
      </ul>
    </section>
  );
};

export default ComponentMenu;
