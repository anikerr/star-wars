import React from 'react';
import { formatDate } from '../helpers';

const SingleCharacter = props => {
  if (props.error) {
    console.log(props.error);
    return <h1>Error - please select another character</h1>;
  } else {
    return (
      <div class="character">
        {props.selectedChar && (
          <div>
            <h1>{props.selectedChar.name}</h1>
            <img
              src={require(`../assets/${props.selectedChar.height}.jpg`)}
              alt="character"
            />
          </div>
        )}
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
  }
};

export default SingleCharacter;
