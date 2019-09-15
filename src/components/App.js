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

  async getData(item) {
    const result = await axios.get(item);
    return result.data;
  }

  async getFilms(filmArr) {
    try {
      const films = await Promise.all(filmArr.map(url => this.getData(url)));
      this.setState({
        films,
        isLoading: false,
        error: null,
      });
      console.log(films);
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
