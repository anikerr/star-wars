import React from 'react';
import { randomMessage } from '../helpers';
import icon from '../assets/img/yoda.png';

class ErrorMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
    };
  }

  componentDidMount() {
    const message = randomMessage();
    this.setState({ message });
  }

  componentWillUnmount() {
    this.setState({ message: null });
  }

  render() {
    return (
      <div>
        <h1>Error</h1>
        <p>
          <em>{this.state.message}</em>
          <img src={icon} alt="yoda" width="28" />
        </p>
      </div>
    );
  }
}

export default ErrorMessage;
