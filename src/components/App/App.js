import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import s from './App.scss';
import _ from 'lodash';
import Register from '../Register/Register';
import {getWinner} from '../../gameLogic';

class App extends React.Component {
  static propTypes = {
    t: PropTypes.func,
  };

  state = {
    player1: '',
    player2: '',
    isGameStarted: false,
    board: [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ],
    currentPlayer: 'X',
    winner: '',
    points1: {
      row: [0, 0, 0],
      col: [0, 0, 0],
      diag: 0,
      antiDiag: 0
    },
    points2: {
      row: [0, 0, 0],
      col: [0, 0, 0],
      diag: 0,
      antiDiag: 0
    },
    moves: 0,

  };

  updatePoints(currentPlayer, rowIndex, colIndex) {
    const points = currentPlayer === 'X' ? this.state.points1 : this.state.points2;
    points.row[rowIndex]++;
    points.col[colIndex]++;
    if (rowIndex == colIndex) points.diag++;
    if (rowIndex + colIndex == 2) points.antiDiag++;
    return getWinner(points.row[rowIndex], points.col[rowIndex], points.diag, points.antiDiag, currentPlayer, this.state.moves++);
  };


  handleCellClick = (rowIndex, colIndex) => {
    if (this.state.board[rowIndex][colIndex] === '') {
      const board = _.cloneDeep(this.state.board);
      board[rowIndex][colIndex] = this.state.currentPlayer;
      const nextPlayer = this.state.currentPlayer === 'X' ? 'O' : 'X';
      const winner = this.updatePoints(this.state.currentPlayer, rowIndex, colIndex);
      this.setState({board, currentPlayer: nextPlayer, winner, moves: this.state.moves++});
    }
  };

  render() {
    const {t} = this.props;

    return (
      <div className={s.root}>
        <h2 className={s.title} data-testid="app-title">
          {t('app.title')}
        </h2>

        <Register
          onStart={(player1, player2) => {
            this.setState({player1, player2, isGameStarted: true});
          }}
        />

        <h3>
          <span>Game is on!</span>
          <span
            id="player-1-title"
            style={{fontWeight: this.state.currentPlayer === 'X' ? 'bold' : 'normal'}}
          >
            {this.state.isGameStarted && this.state.player1}
          </span>
          <span>VS.</span>
          <span
            id="player-2-title"
            style={{fontWeight: this.state.currentPlayer === 'O' ? 'bold' : 'normal'}}
          >
            {this.state.isGameStarted && this.state.player2}
          </span>
        </h3>

        <div>
          {this.state.board.map((row, rowIndex) => {
            return (
              <div key={rowIndex}>
                {row.map((cellValue, colIndex) => {
                  const key = `cell-${rowIndex}-${colIndex}`;
                  return (
                    <span
                      className={s.cell}
                      key={key}
                      data-hook={key}
                      onClick={() => this.handleCellClick(rowIndex, colIndex)}
                    >
                      {cellValue}
                    </span>
                  );
                })}
              </div>
            );
          })}
        </div>
        {this.state.moves === 9 ? (
            <h3 id="tie">
              It is most definitely a tie!
            </h3>
          ) : (<h3>
            The winner is: <span id="winner">{this.state.winner}</span>
          </h3>)}
      </div>
    );
  }
}
export default translate()(App);
