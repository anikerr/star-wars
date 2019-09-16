import React from 'react';
import { randomMessage } from '../helpers';

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
        </p>
      </div>
    );
  }
}

export default ErrorMessage;
