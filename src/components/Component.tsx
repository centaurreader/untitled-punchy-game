import React, {
  useState,
  useRef,
  useEffect,
} from 'react';
import CardsControls from './CardsControls';
import DetailsComponent from './DetailsComponent';
import DiceControls from './DiceControls';

const Component: React.FC<{
  item: TableItem;
  name: string;
  onOpen: () => void;
  removeItem: () => void;
  type: string|null;
  updateItem: (item: TableItem) => void;
}> = ({
  item,
  onOpen,
  removeItem,
  type,
  updateItem,
}) => {
  const [isControlsVisible, setIsControlsVisible] = useState(false);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const menu = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!menu?.current?.contains(event.target as Element)) { 
        setIsControlsVisible(false);
        setIsDetailsVisible(false);
      }
    };
    document.addEventListener('click', listener);
    return () => document.removeEventListener('click', listener);
  }, []);

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
  };

  const showDetails = (e: React.MouseEvent) => {
    onOpen();
    setIsDetailsVisible(true);
  };

  const showControls = (e: React.MouseEvent) => {
    onOpen();
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
    <div className="component_container" ref={menu} onClick={e => e.stopPropagation()}>
      <div className={getStyles()}>
        <span className="component_value">{item.value}</span>
        <button type="button" className="component_menu_button" onClick={showDetails}>i</button>
        <button type="button" className="component_controls_button" onClick={showControls}>menu</button>
      </div>
      <div className={`component_details ${isDetailsVisible ? 'component_details-open' : ''}`}>
        <DetailsComponent item={item} />
      </div>
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
