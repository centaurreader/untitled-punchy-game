import React from 'react';
import { useDrag, DragSourceHookSpec } from 'react-dnd';

const Draggable: React.FC<{
  id: string;
  position: DraggablePosition;
}> = ({
  children,
  id,
  position,
}) => {
  const type = 'game-item';
  const [{ isDragging }, drag] = useDrag({
    item: { id, type, position, },
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
      style={{ position: 'absolute', left: position.x, top: position.y, }}
    >
      {children}
    </button>
  );
};

export default Draggable;
