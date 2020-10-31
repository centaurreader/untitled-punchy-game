import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
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
  onSelection: (items: Array<TableItem|undefined>) => void;
  onDrop: any;
}> = ({
  children,
  items,
  onClick,
  onDrop,
  onSelection,
}) => {
  const [selectionBoxCoords, setSelectionBoxCoords] = useState<{
    x1?: number;
    y1?: number;
    x2?: number;
    y2?: number;
  }>({});
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement|null>(null);

  useEffect(() => {
    if (!selectionBoxCoords?.x2) {
      return;
    }
    const selectedItems: Array<TableItem|undefined> = items.map((item) => {
      let box;
      if (selectionBoxCoords?.x2) {
        box = {
          x1: ((selectionBoxCoords?.x1 ?? 0) < (selectionBoxCoords?.x2 ?? 0) ? selectionBoxCoords.x1 : selectionBoxCoords.x2) || 0,
          y1: ((selectionBoxCoords?.y1 ?? 0) < (selectionBoxCoords?.y2 ?? 0) ? selectionBoxCoords.y1 : selectionBoxCoords.y2) || 0,
          x2: ((selectionBoxCoords?.x1 ?? 0) > (selectionBoxCoords?.x2 ?? 0) ? selectionBoxCoords.x1 : selectionBoxCoords.x2) || 0,
          y2: ((selectionBoxCoords?.y1 ?? 0) > (selectionBoxCoords?.y2 ?? 0) ? selectionBoxCoords.y1 : selectionBoxCoords.y2) || 0,
        };
      } else {
        box = { x1: 0, y1: 0, x2: 0, y2: 0, };
      }
      const isInXRange = (box.x1 < item.position.x) && (box.x2 > item.position.x);
      const isInYRange = (box.y1 < item.position.y) && (box.y2 > item.position.y);
      if (isInXRange && isInYRange) {
        return item;
      }
      return undefined;
    }).filter(item => item);
    onSelection(selectedItems);
  }, [selectionBoxCoords]);

  const handleMouseMove = (ev: MouseEvent) => {
    setIsDragging(true);
    setSelectionBoxCoords(state => ({
      ...state,
      x2: ev.clientX,
      y2: ev.clientY,
    }));
  };

  const handleMouseUp = (ev: MouseEvent) => {
    setSelectionBoxCoords({});
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const onMouseDown = (ev: React.MouseEvent) => {
    if (ev.target !== containerRef.current) {
      return;
    }
    setSelectionBoxCoords({
      x1: ev.clientX,
      y1: ev.clientY,
    });
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const getBoxStyle = () => {
    if (!selectionBoxCoords.x1) {
      return undefined;
    }
    const width = (selectionBoxCoords?.x2 ?? 0) > (selectionBoxCoords?.x1 ?? 0)
      ? (selectionBoxCoords?.x2 ?? 0) - (selectionBoxCoords?.x1 ?? 0)
      : (selectionBoxCoords?.x1 ?? 0) - (selectionBoxCoords?.x2 ?? 0);
    const height = (selectionBoxCoords?.y2 ?? 0) > (selectionBoxCoords?.y1 ?? 0)
      ? (selectionBoxCoords?.y2 ?? 0) - (selectionBoxCoords?.y1 ?? 0)
      : (selectionBoxCoords?.y1 ?? 0) - (selectionBoxCoords?.y2 ?? 0);
    const left = (selectionBoxCoords?.x2 ?? 0) > (selectionBoxCoords?.x1 ?? 0)
      ? selectionBoxCoords?.x1
      : selectionBoxCoords?.x2;
    const top = (selectionBoxCoords?.y2 ?? 0) > (selectionBoxCoords?.y1 ?? 0)
      ? selectionBoxCoords?.y1
      : selectionBoxCoords?.y2;

    return {
      left: left ? `${left}px` : 0,
      top: top ? `${top}px` : 0,
      width: selectionBoxCoords?.x2 ? `${width}px` : 0,
      height: selectionBoxCoords?.y2 ? `${height}px` : 0,
    };
  };

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
    if (isDragging) {
      setIsDragging(false);
      return;
    }
    onClick({
      x: event.clientX,
      y: event.clientY,
      z: 1,
    });
  };

  return (
    <div
      className="game_board"
      onClick={handleClick}
      onMouseDown={onMouseDown}
      ref={(ref) => { drop(ref); containerRef.current = ref; }}
    >
      <div className="selection_box" style={getBoxStyle()} />
      {children}
    </div>
  );
};

export default Table;
