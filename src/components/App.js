import React from 'react';
import axios from 'axios';
import AllCharacters from './allCharacters';
import SingleCharacter from './singleCharacter';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: [],
      selectedChar: null,
      films: [],
      isLoading: false,
      error: null,
    };
    this.getFilms.bind(this);
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    try {
      const result = await axios.get('./characters.json');
      this.setState({
        characters: result.data.characters,
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        error,
        isLoading: false,
      });
    }
  }

  async getCharacter(event, url) {
    event.preventDefault();
    try {
      const result = await axios.get(url);
      this.setState({
        selectedChar: result.data,
        error: null,
      });
      this.getFilms(this.state.selectedChar.films);
    } catch (error) {
      this.setState({
        error,
        selectedChar: null,
      });
    }
  }

  getFilms(filmArr) {
    this.setState({ isLoading: true });
    try {
      const films = filmArr.forEach(async url => {
        const result = await axios.get(url);
        console.log(result.data);
        return result.data;
      });
      console.log(films);

      this.setState({
        films,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      this.setState({
        films: null,
        isLoading: false,
        error,
      });
    }
  }

  render() {
    return (
      <div className="App">
        {this.state.selectedChar && (
          <SingleCharacter
            selectedChar={this.state.selectedChar}
            films={this.state.films}
            isLoading={this.state.isLoading}
          />
        )}
        {this.state.error && <h1>Error - please select another character</h1>}

        <AllCharacters
          characters={this.state.characters}
          getCharacter={this.getCharacter.bind(this)}
          isLoading={this.state.isLoading}
        />
      </div>
    );
  }
}
