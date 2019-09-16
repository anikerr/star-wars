import React from 'react';
import axios from 'axios';
import { CSSTransition } from 'react-transition-group';

import AllCharacters from './AllCharacters';
import SingleCharacter from './SingleCharacter';
import Header from './Header';
import '../assets/fade.css';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: [],
      selectedChar: null,
      films: [],
      show: false,
      fadeIn: false,
      isLoading: false,
      error: false,
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true, fadeIn: true });
    try {
      const result = await axios.get('./characters.json');
      this.setState({
        characters: result.data.characters,
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        error: true,
        isLoading: false,
      });
    }
  }

  async getCharacter(event, url) {
    event.preventDefault();
    this.setState({
      show: false,
    });
    try {
      const result = await axios.get(url);
      this.setState({
        show: true,
        selectedChar: result.data,
        error: null,
      });
      this.getFilms(this.state.selectedChar.films);
    } catch (error) {
      this.setState({
        show: true,
        error: true,
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
        error: false,
      });
      console.log(films);
    } catch (error) {
      this.setState({
        films: null,
        isLoading: false,
        error: true,
      });
    }
  }

  render() {
    return (
      <div className="container">
        <CSSTransition in={this.state.fadeIn} timeout={600} classNames="fade">
          <Header />
        </CSSTransition>
        <AllCharacters
          characters={this.state.characters}
          getCharacter={this.getCharacter.bind(this)}
          isLoading={this.state.isLoading}
        />
        <CSSTransition in={this.state.show} timeout={600} classNames="fade">
          <SingleCharacter
            selectedChar={this.state.selectedChar}
            films={this.state.films}
            error={this.state.error}
          />
        </CSSTransition>
      </div>
    );
  }
}
