import { getWinner } from './gameLogic';

describe('Game logic', () => {
  describe('getWinner', () => {
    it('Should indicate X wins, in case first line is filled with X', () => {
      const result = getWinner(3,0,0,0, "Hello");
      expect(result).toBe('Hello');
    });

    it('Should indicate X wins, in case antiDiag is filled with X', () => {
      const result = getWinner(0,0,0,3, 'X');
      expect(result).toBe('X');
    });

    it('Should indicate nobody won', () => {
      const result = getWinner(2,0,0,0);
      expect(result).toBe(false);
    });
  });
});
