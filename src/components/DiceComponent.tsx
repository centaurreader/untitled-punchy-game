import React, { useEffect, useState, } from 'react';
import GameComponent from './GameComponent';

interface Props {
  componentGroup: ComponentGroup;
}

const DiceComponent: React.FC<Props> = ({
  componentGroup,
}) => {
  const [color, setColor] = useState('');

  useEffect(() => {
    function makeColor() { return Math.floor(Math.random() *255); }
    const color = `${makeColor()}, ${makeColor()}, ${makeColor()}`;
    setColor(`rgba(${color}, 0.3)`);
  }, [ setColor, ]);

  return (
    <section className="dice_group" style={{ backgroundColor: color, }}>
      <p>{componentGroup.name}</p>
      <button className="dice_open">Open</button>
    </section>
  );
};

export default DiceComponent;
