function getElementText(selector) {
  return page.$eval(selector, element => element.innerText);
}

function getElementStyle(selector) {
  return page.$eval(selector, element => element.style);
}

function navigate() {
  return page.goto(app.getUrl('/'));
}

async function fillInForm() {
  await page.type('#player-1-input', 'Sapir');
  await page.type('#player-2-input', 'Yoshi');
}

async function getPlayerNamesFromTitle() {
  const player1Title = await getElementText('#player-1-title');
  const player2Title = await getElementText('#player-2-title');
  return [player1Title, player2Title];
}

function clickStart() {
  return page.click('#start-game');
}

function clickCellAt(rowIndex, colIndex) {
  return page.click(`[data-hook="cell-${rowIndex}-${colIndex}"]`);
}

function getCellValueAt(rowIndex, colIndex) {
  return getElementText(`[data-hook="cell-${rowIndex}-${colIndex}"]`);
}

describe('Tic tac to game', () => {
  it('Should register both players and add them to title', async () => {
    await navigate();
    await fillInForm();

    expect(await getPlayerNamesFromTitle()).toEqual(['', '']);

    await clickStart();

    expect(await getPlayerNamesFromTitle()).toEqual(['Sapir', 'Yoshi']);
  });

  // it('Current`s player name should be in bold', async () => {
  //   await navigate();
  //   await fillInForm();
  //   await clickStart();
  //   await page.$eval("player-1-title", element => element.style).
  //
  // });

  it('Should mark cells with X and O', async () => {
    await navigate();
    await fillInForm();
    await clickStart();

    await clickCellAt(0, 0);
    expect(await getCellValueAt(0, 0)).toBe('X');
    await clickCellAt(1, 0);
    expect(await getCellValueAt(1, 0)).toBe('O');
  });

  it('Should click on same cell twice and not change the first value', async () => {
    await navigate();
    await fillInForm();
    await clickStart();

    await clickCellAt(0, 0);
    expect(await getCellValueAt(0, 0)).toBe('X');
    await clickCellAt(0, 0);
    expect(await getCellValueAt(0, 0)).toBe('X');
  });

  it('Should play a full game an announce a winner', async () => {
    await navigate();
    await fillInForm();
    await clickStart();

    await clickCellAt(0, 0);
    await clickCellAt(1, 0);
    await clickCellAt(0, 1);
    await clickCellAt(1, 1);
    await clickCellAt(0, 2);

    expect(await getElementText('#winner')).toBe('X');
  });

  it('Should play a full game an announce a tie', async () => {
    await navigate();
    await fillInForm();
    await clickStart();

    await clickCellAt(0, 0);
    await clickCellAt(1, 0);
    await clickCellAt(0, 1);
    await clickCellAt(1, 1);
    await clickCellAt(2, 0);
    await clickCellAt(2, 1);
    await clickCellAt(1, 2);
    await clickCellAt(0, 2);
    await clickCellAt(2, 2);



    expect(await getElementText('#tie')).toBe('It is most definitely a tie!');
  });
});
