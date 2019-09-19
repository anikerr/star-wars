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
    try {
      const result = await axios.get(item);
      return result.data;
    } catch (error) {
      this.setState({
        films: null,
        isLoading: false,
        error: true,
      });
    }
  }

  async getFilms(filmArr) {
    try {
      const films = await Promise.all(filmArr.map(url => this.getData(url)));
      this.setState({
        films,
        isLoading: false,
        error: false,
      });
      this.refs.characterView.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
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
      <div>
        <div className="container-fluid">
          <CSSTransition in={this.state.fadeIn} timeout={600} classNames="fade">
            <Header />
          </CSSTransition>
          <div className="container">
            <AllCharacters
              characters={this.state.characters}
              getCharacter={this.getCharacter.bind(this)}
              isLoading={this.state.isLoading}
            />
          </div>
        </div>
        <div className="container">
          <CSSTransition in={this.state.show} timeout={600} classNames="fade">
            <div ref="characterView">
              <SingleCharacter
                selectedChar={this.state.selectedChar}
                films={this.state.films}
                error={this.state.error}
              />
            </div>
          </CSSTransition>
        </div>
      </div>
    );
  }
}
