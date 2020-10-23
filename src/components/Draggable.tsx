import React from 'react';
import { useDrag, DragSourceHookSpec } from 'react-dnd';

const Draggable: React.FC<{
  item: TableItem;
}> = ({
  children,
  item,
}) => {
  const type = 'game-item';
  const [{ isDragging }, drag] = useDrag({
    item: {
      id: item.id,
      type,
      position: item.position,
      component: item.component,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  if (isDragging) {
    return null;
  }

  return (
    <button
      ref={drag}
      type="button"
      style={{ position: 'absolute', left: item.position.x, top: item.position.y, }}
    >
      {children}
    </button>
  );
};

export default Draggable;
