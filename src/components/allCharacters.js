import React from 'react';

const AllCharacters = props => {
  return (
    <div>
      <h1>Choose a Character</h1>
      {!props.isLoading && (
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
      )}
    </div>
  );
};

export default AllCharacters;