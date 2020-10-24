import React, {
  useState,
  useRef,
  useEffect,
} from 'react';
import CardsControls from './CardsControls';
import DiceControls from './DiceControls';

const Component: React.FC<{
  item: TableItem;
  name: string;
  removeItem: () => void;
  type: string;
  updateItem: (item: TableItem) => void;
}> = ({
  item,
  name,
  removeItem,
  type,
  updateItem,
}) => {
  const [isValueChanging, setIsValueChanging] = useState(false);
  const [value, setValue] = useState(item.value);
  const [isControlsVisible, setIsControlsVisible] = useState(false);
  const menu = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!menu?.current?.contains(event.target as Element)) { 
        setIsControlsVisible(false);
      }
    };
    document.addEventListener('click', listener);
    return () => document.removeEventListener('click', listener);
  }, []);

  useEffect(() => {
    if (item.value === value) return;
    setIsValueChanging(true);
    setTimeout(() => {
      setValue(item.value);
      setIsValueChanging(false);
    }, 300);
  }, [item.value]);

  const getStyles = () => {
    let styles = 'component';
    switch (type) {
      case 'Dice': {
        return `${styles} component-dice`;
      }
      case 'Cards': {
        return `${styles} component-cards`;
      }
      default:
        return styles;
    }
  }

  const showControls = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsControlsVisible(true);
  };

  const getControls = () => {
    switch (type) {
      case 'Dice': {
        return DiceControls;
      }
      case 'Cards': {
        return CardsControls;
      }
      default:
        return undefined;
    }
  };

  const ControlsComponent = getControls();

  return (
    <div ref={menu} onClick={e => e.stopPropagation()}>
      <button className={getStyles()} type="button" onClick={showControls}>
        <span className="component_value">{isValueChanging ? '...' : value}</span>
        <div className="component_menu">
          {name}
        </div>
      </button>
      <div className={`component_controls ${isControlsVisible ? 'component_controls-open' : ''}`}>
        {ControlsComponent ? (
          <ControlsComponent
            closeMenu={() => setIsControlsVisible(false)}
            item={item}
            removeItem={removeItem}
            updateItem={updateItem}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Component;
