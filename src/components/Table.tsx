import React from 'react';
import { DragObjectWithType, useDrop, } from 'react-dnd';

interface DroppedItem extends DragObjectWithType {
  id: string;
  position: DraggablePosition;
  component: Component;
  componentType: ComponentTypes;
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
          },
          component: item.component,
          componentType: item.componentType,
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
      className="game_board"
    >
      {children}
    </div>
  );
};

export default Table;
