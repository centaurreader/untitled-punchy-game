import React from 'react';
import { DragObjectWithType, useDrop, } from 'react-dnd';

interface DroppedItem extends DragObjectWithType {
  id: string;
  position: DraggablePosition;
  component: Component;
  componentType: ComponentTypes;
}

const Table: React.FC<{
  items: Array<TableItem>;
  onClick: (position: DraggablePosition) => void;
  onDrop: any;
}> = ({
  items,
  children,
  onClick,
  onDrop,
}) => {
  const findHighestZIndex = () => {
    return items.reduce((nextZIndex, item) => {
      return item.position.z > nextZIndex ? item.position.z : nextZIndex;
    }, 1);
  };

  const [, drop] = useDrop({
    accept: 'game-item',
    drop: (item: DroppedItem, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset()
        || { x: 0, y: 0, };
      onDrop(
        {
          ...item,
          position: {
            x: Math.round(item.position.x + delta.x),
            y: Math.round(item.position.y + delta.y),
            z: findHighestZIndex() + 1,
          },
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
      z: 1,
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
