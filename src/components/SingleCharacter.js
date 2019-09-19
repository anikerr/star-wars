import React from 'react';
import ErrorMessage from './ErrorMessage.js';
import { formatDate } from '../helpers';
import './SingleCharacter.css';

const SingleCharacter = props => {
  if (props.error) {
    return <ErrorMessage />;
  } else {
    return (
      <div className="character">
        {props.selectedChar && (
          <div>
            <h1>{props.selectedChar.name}</h1>
            <img
              src={require(`../assets/img/${props.selectedChar.height}.jpg`)}
              alt="character"
            />
          </div>
        )}
        {props.films.length > 0 && (
          <div>
            <h1>Films</h1>
            <ul>
              {props.films.map(film => (
                <li key={film.created}>
                  <em>{film.title}</em>, {formatDate(film.release_date)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
};

export default SingleCharacter;
