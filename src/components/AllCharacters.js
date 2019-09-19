import React from 'react';
import './AllCharacters.css';

const AllCharacters = props => {
  return (
    <div>
      {!props.isLoading && (
        <div className="characters">
          <h1>Choose a Character</h1>
          <ul>
            {props.characters.map(character => (
              <li key={character.name}>
                <button
                  type="button"
                  onClick={event => props.getCharacter(event, character.url)}
                >
                  {character.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AllCharacters;
