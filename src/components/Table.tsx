import React from 'react';
import { DragObjectWithType, useDrop, } from 'react-dnd';

interface DroppedItem extends DragObjectWithType {
  id: string;
  position: DraggablePosition;
}

const Table: React.FC<{
  onClick: (position: DraggablePosition) => void;
  onDrop: any;
}> = ({
  children,
  onClick,
  onDrop,
}) => {

  const [, drop] = useDrop({
    accept: 'game-item',
    drop: (item: DroppedItem, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset()
        || { x: 0, y: 0, };
      onDrop(
        {
          id: item.id,
          position: {
            x: Math.round(item.position.x + delta.x),
            y: Math.round(item.position.y + delta.y),
          }
        },
      );
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  const handleClick = (event: React.MouseEvent) => {
    onClick({
      x: event.clientX,
      y: event.clientY,
    });
  };

  return (
    <div
      ref={drop}
      onClick={handleClick}
      style={{ position: 'relative', height: '1000px', width: '1000px', background: 'whitesmoke', }}
    >
      {children}
    </div>
  );
};

export default Table;
