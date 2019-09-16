import React from 'react';
import { formatDate } from '../helpers';

const SingleCharacter = props => {
  return (
    <div>
      <h1>{props.selectedChar.name}</h1>
      {props.films && (
        <ul>
          {props.films.map(film => (
            <li key={film.created}>
              <em>{film.title}</em>, {formatDate(film.release_date)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SingleCharacter;
