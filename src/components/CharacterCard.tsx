import React from 'react';

const CharacterCard: React.FunctionComponent<{
  name: string;
  health: string;
  moves: Array<{
    name: string;
    resources: Array<string>;
  }>
}> = ({
  name,
  health,
  moves = [],
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
              {move.name} {(move.resources || []).map(r => (`${r} `))}
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
};

export default CharacterCard;
