import React from 'react';

interface Props {
  component: Component;
}

const GameComponentGroup: React.FC<Props> = ({
  component,
}) => {
  return (
    <section className="component_group">
      <p>{component.name}</p>
      <p>{component.description}</p>
      <p>{component.quantity}</p>
      <p>{component.properties.map(property => (<p>{property.name}: {property.value}</p>))}</p>
    </section>
  );
};

export default GameComponentGroup;
