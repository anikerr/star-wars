import React from 'react';

const SingleCharacter = props => {
  return (
    <div>
      <h1>{props.selectedChar.name}</h1>
      {props.films && (
        <ul>
          {props.films.map(film => (
            <li key={film.date}>
              {film.title}, {film.date}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SingleCharacter;
