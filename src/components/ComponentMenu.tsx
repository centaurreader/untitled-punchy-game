import React, { useEffect, useState } from 'react';
import ComponentMenuListItem from './ComponentMenuListItem';

const ComponentMenu: React.FC<{
  addItem: (item: TableItem) => void;
  game: Box | null;
  isOpen: boolean;
  position: DraggablePosition;
}> = ({ addItem, game, isOpen, position, }) => {
  const [menuContent, setMenuContent] = useState<Array<Array<ComponentGroup|Component>>>([
    game?.componentGroups ?? [],
  ]);

  useEffect(() => {
    if (!isOpen) {
      setMenuContent([
        game?.componentGroups ?? [],
      ]);
    }
  }, [isOpen, setMenuContent]);

  const pushMenuContent = (content: Array<ComponentGroup|Component>) => {
    setMenuContent(state => [
      ...state,
      content,
    ]);
  };

  return (
    <section
      className={`context_menu ${isOpen ? 'context_menu-open' : undefined}`}
      style={{ left: position.x, top: position.y, }}
    >
      <h2>Components</h2>
      <div style={{ position: 'relative', }}>
        {menuContent.map((content, i) => (
          <ul
            className="context_menu--list"
            style={{
              left: `${100 * ((menuContent.length - (i + 1)) * -1)}%`,
              zIndex: menuContent.length - i,
            }}
          >
            {content.map((componentGroup) => (
              <ComponentMenuListItem
                addItem={addItem}
                componentGroup={componentGroup}
                key={componentGroup.id}
                id={componentGroup.id}
                onSelect={pushMenuContent}
              />
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
};

export default ComponentMenu;
