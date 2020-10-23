import React from 'react';

const Component: React.FC<{
  name: string;
  type: string;
}> = ({
  name,
  type,
}) => {
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
  return (
    <div className={getStyles()}>
      <div className="component_menu">
        {name}
      </div>
    </div>
  );
};

export default Component;
