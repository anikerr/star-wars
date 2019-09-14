import React from 'react'
import axios from 'axios'

export default class CharacterList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: [],
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
        isLoading: false
      });
      console.log(this.state)
    } catch (error) {
      this.setState({
        error,
        isLoading: false
      });
    }
  }

  render () {
    if(this.state.error) {
      return (
        <h2>{this.state.error}</h2>
      )
    }

    return (
      <div>
      <h1>Characters</h1>
      {!this.state.isLoading &&
          <ul>
            {this.state.characters.map(character =>
            <li key={character.name}>{character.name}</li>
            )}
          </ul>
      }
    </div>
    )
  }
}
