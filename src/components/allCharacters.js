import React from 'react';
import axios from 'axios';
import SingleCharacter from './singleCharacter';

export default class CharacterList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: [],
      selectedChar: null,
      isLoading: false,
      error: null,
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    try {
      const result = await axios.get('./characters.json');
      this.setState({
        characters: result.data.characters,
        isLoading: false,
      });
      console.log(this.state);
    } catch (error) {
      this.setState({
        error,
        isLoading: false,
      });
    }
  }

  async getCharacter(event, url) {
    event.preventDefault();
    this.setState({ isLoading: true });
    try {
      const result = await axios.get(url);
      this.setState({
        selectedChar: result.data,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        error,
        selectedChar: null,
        isLoading: false,
      });
      console.log(this.state);
    }
  }

  render() {
    return (
      <div>
        {this.state.selectedChar && <SingleCharacter {...this.state} />}
        {this.state.error && <h1>Error - please select another character</h1>}
        <h1>Choose a Character</h1>
        {!this.state.isLoading && (
          <ul>
            {this.state.characters.map(character => (
              <li key={character.name}>
                <button
                  type="button"
                  onClick={event => this.getCharacter(event, character.url)}
                >
                  {character.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
