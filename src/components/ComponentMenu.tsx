import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react';
import ComponentMenuListItem from './ComponentMenuListItem';

export interface Content {
  content: Array<ComponentGroup|Component>;
  type?: ComponentTypes;
  id: string;
}

const ComponentMenu: React.FC<{
  addItem: (item: TableItem) => void;
  game: Box | null;
  isOpen: boolean;
  position: DraggablePosition;
  table: Table;
}> = ({ addItem, game, isOpen, position, table, }) => {
  const [menuContent, setMenuContent] = useState<Array<Content>>([
    {
      content: game?.componentGroups ?? [],
      id: nanoid(),
    }
  ]);

  useEffect(() => {
    if (!isOpen) {
      setMenuContent([
        {
          content: game?.componentGroups ?? [],
          id: nanoid(),
        }
      ]);
    }
  }, [isOpen, setMenuContent]);

  const pushMenuContent = (content: Content) => {
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
        {menuContent.map((list, i) => (
          <ul
            key={list.id}
            className="context_menu--list"
            style={{
              left: `${100 * ((menuContent.length - (i + 1)) * -1)}%`,
              zIndex: menuContent.length - i,
            }}
          >
            {list.content.map((componentGroup) => (
              <ComponentMenuListItem
                addItem={addItem}
                componentGroup={componentGroup}
                key={componentGroup.id}
                onSelect={pushMenuContent}
                table={table}
                {...('type' in list) ? { type: list.type } : {}}
              />
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
};

export default ComponentMenu;
