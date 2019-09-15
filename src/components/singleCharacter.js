import React from 'react';

const SingleCharacter = props => {
  return (
    <div>
      <h1>{props.selectedChar.name}</h1>
      {props.films && (
        <ul>
          {props.films.map(film => (
            <li key={film.created}>
              {film.title}, {film.created}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SingleCharacter;
