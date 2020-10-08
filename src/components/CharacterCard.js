import React from 'react';
import PropTypes from 'prop-types';

const CharacterCard = ({
  name,
  health,
  moves,
}) => {
  return (
    <section className="card">
      <h2>{name}</h2>
      <section>
        <label>
          Health
          <input type="number" disabled value={health} />
        </label>
      </section>
      <section>
        <h3>Moves</h3>
        <ul>
          {moves.map((move) => (
            <li key={move.name}>
              {move.name} {move.resources.map(r => (`${r} `))}
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
};
CharacterCard.propTypes = {
  name: PropTypes.string,
  health: PropTypes.string,
  moves: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    resources: PropTypes.arrayOf(PropTypes.oneOf(['P', 'K', 'D'])),
  })),
};
CharacterCard.defaultProps = {
  name: 'Mutant Man',
  health: '21',
  moves: [
    {
      name: 'Punch',
      resources: [ 'P', 'P', 'D', ],
    },
    {
      name: 'Kick',
      resources: [ 'K', 'K', 'D', ],
    },
    {
      name: 'Mutator Slam',
      resources: [ 'K', 'K', 'P', 'D', 'D', ],
    },
  ],
};

export default CharacterCard;
