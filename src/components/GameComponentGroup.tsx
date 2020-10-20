import React from 'react';
import GameComponent from './GameComponent';

interface Props {
  componentGroup: ComponentGroup;
}

const GameComponentGroup: React.FC<Props> = ({
  componentGroup,
}) => {
  return (
    <section className="component_group">
      <p>{componentGroup.name}</p>
      {componentGroup.components
        ? componentGroup.components.map((component: Component) => <GameComponent key={component.name} component={component} />)
        : null}
    </section>
  );
};

export default GameComponentGroup;
