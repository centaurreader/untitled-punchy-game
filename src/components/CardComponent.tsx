import React, { useEffect, useState } from 'react';

interface Props {
  componentGroup: ComponentGroup;
}

const CardComponent: React.FC<Props> = ({
  componentGroup,
}) => {
  const [topColor, setTopColor] = useState('');
  const [bottomColor, setBottomColor] = useState('');

  useEffect(() => {
    function makeColor() { return Math.floor(Math.random() *255); }
    const color = `${makeColor()}, ${makeColor()}, ${makeColor()}`;
    setTopColor(`rgba(${color}, 0.3)`);
    setBottomColor(`rgba(${color}, 0.2)`);
  }, [ setTopColor, setBottomColor, ]);

  return (
    <div className="card_group">
      <p className="card_label">{componentGroup.name}</p>
      <button className="card_half" style={{ backgroundColor: topColor, }}>Draw Card</button>
      <button className="card_half" style={{ backgroundColor: bottomColor, }}>View Cards</button>
      <button className="card_shuffler">Shuffle</button>
    </div>
  );
};

export default CardComponent;
