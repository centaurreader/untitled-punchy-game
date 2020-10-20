import React from 'react';
import CardComponent from './CardComponent';
import DiceComponent from './DiceComponent';

interface Props {
  component: any;
}

const GameBox: React.FC<Props> = ({
  component,
}) => {
  const getComponentGroupType = (type: ComponentTypes) => {
    const components = {
      Cards: CardComponent,
      Dice: DiceComponent,
    };
    return components[type];
  };

  return (
    <section className="box">
      {component.componentGroups
        ? component.componentGroups.map((componentGroup: ComponentGroup) => {
          const Component = getComponentGroupType(componentGroup.type);
          return <Component key={componentGroup.id} componentGroup={componentGroup} />;
        })
        : null}
    </section>
  );
};

export default GameBox;
