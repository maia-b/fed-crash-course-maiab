import React from 'react';
import PropTypes from 'prop-types';

export default class Register extends React.Component {
  state = {
    player1: '',
    player2: '',
  };

  render() {
    return (
      <React.Fragment>
        <input
          type="text"
          id="player-1-input"
          value={this.state.player1}
          onChange={e => this.setState({ player1: e.target.value })}
          placeholder="Player 1 Name"
        />
        <input
          type="text"
          id="player-2-input"
          value={this.state.player2}
          onChange={e => this.setState({ player2: e.target.value })}
          placeholder="Player 2 Name"
        />

        <button
          id="start-game"
          onClick={() => {
            if (this.state.player1 && this.state.player2) {
              this.props.onStart(this.state.player1, this.state.player2)
            }
          }}
        >
          Start game
        </button>
      </React.Fragment>
    );
  }
}

Register.displayName = 'Register';
Register.propTypes = {
  onStart: PropTypes.func.isRequired,
};
