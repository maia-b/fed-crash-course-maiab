
export function getWinner(row, col, diag, antiDiag, name) {
  if (row == 3 || col == 3 || diag == 3 || antiDiag == 3) {
    return name;
  } else {
    return false;
  }
}



