import React from 'react';

const SingleCharacter = (props) => {
    return (
      <div>
        <h1>{props.selectedChar.name}</h1>
      </div>
    );
  }

export default SingleCharacter;
