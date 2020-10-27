import React from 'react';
import { useDrag, } from 'react-dnd';

const Draggable: React.FC<{
  item: TableItem;
}> = ({
  children,
  item,
}) => {
  const type = 'game-item';
  const [{ isDragging }, drag] = useDrag({
    item: {
      ...item,
      type,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  if (isDragging) {
    return null;
  }

  return (
    <div
      ref={drag}
      style={{
        position: 'absolute',
        left: item.position.x,
        top: item.position.y,
        zIndex: item.position.z,
        border: 0,
        backgroundColor: 'transparent',
        outline: 'none',
      }}
    >
      {children}
    </div>
  );
};

export default Draggable;
