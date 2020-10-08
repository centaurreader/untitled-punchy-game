import React from 'react';

const CharacterCard = () => {
  return (
    <section className="card">
      <h2>Character Name</h2>
      <section>
        <label>
          Health
          <input type="number" disabled value={3} />
        </label>
      </section>
      <section>
        <h3>Moves</h3>
        <ul>
          <li>Punch P P D</li>
          <li>Kick K K D</li>
          <li>Special P P K D D</li>
        </ul>
      </section>
    </section>
  );
};

export default CharacterCard;
