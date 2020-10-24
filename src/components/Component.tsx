import React, {
  useState,
  useRef,
  useEffect,
} from 'react';
import CardsControls from './CardsControls';
import DiceControls from './DiceControls';

const Component: React.FC<{
  name: string;
  type: string;
}> = ({
  name,
  type,
}) => {
  const [isControlsVisible, setIsControlsVisible] = useState(false);
  const menu = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (!menu?.current?.contains(event.target as Element)) { 
        setIsControlsVisible(false);
      }
    });
  }, [setIsControlsVisible]);

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
        return <DiceControls closeMenu={() => setIsControlsVisible(false)} />;
      }
      case 'Cards': {
        return <CardsControls />;
      }
      default:
        return null;
    }
  };

  return (
    <div ref={menu} onClick={e => e.stopPropagation()}>
      <button className={getStyles()} type="button" onClick={showControls}>
        <div className="component_menu">
          {name}
        </div>
      </button>
      <div className={`component_controls ${isControlsVisible ? 'component_controls-open' : ''}`}>
        {getControls()}
      </div>
    </div>
  );
};

export default Component;
