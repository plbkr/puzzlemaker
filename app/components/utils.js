module.exports.applyBlocks = applyBlocks;
module.exports.getSymmetricalCell = getSymmetricalCell;
module.exports.initGrid = initGrid;
module.exports.findAcross = findAcross;
module.exports.findDown = findDown;
module.exports.getCellClue = getCellClue;
module.exports.measureMyInputText = measureMyInputText;
module.exports.calculateAllClueNumbers = calculateAllClueNumbers;

function applyBlocks(_grid, blocks) {
  const grid = [..._grid];
  blocks.forEach(([row, column]) => {
    grid[row][column] = false;
    const [symRow, symCol] = getSymmetricalCell(grid, row, column);
    grid[symRow][symCol] = false;
  });

  return grid;
}

function getSymmetricalCell(grid, row, column) {
  const height = grid.length;
  const width = grid[0].length;
  return [width - (row + 1), height - (column + 1)];
}

function initGrid({ rows, columns }) {
  const grid = [];
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < columns; j++) {
      row.push({ value: '', isBlackSquare: false, clue: null, style: null });
    }
    grid.push(row);
  }
  return grid;
}

function findAcross(cellsInActiveRow, activeColumn) {
  // console.log("finding across", { cellsInActiveRow, activeColumn });
  const range = cellsInActiveRow.reduce(
    (range, cell) => {
      // console.log("cell", { range, cell });
      if (range.start !== false && range.end !== false && range.found) {
        range.count++;
        return range;
      }
      if (!range.found && range.start === false) {
        range.start = range.count;
        range.word = "";
      }
      if (!cell.isBlackSquare) {
        range.word += (cell.value.length > 0 ? cell.value : "-");
      }
      if (cell.isBlackSquare && range.found) {
        range.end = range.count - 1;
      }
      if (range.count === activeColumn) {
        range.found = true;
      }
      if (cell.isBlackSquare && !range.found) {
        range.start = false;
      }
      if (!range.end && range.count === cellsInActiveRow.length - 1) {
        range.end = range.count;
      }

      range.count++;
      return range;
    },
    { count: 0, start: false, end: false, found: false, word: "" }
  );

  return { range: [range.start, range.end], word: range.word };
}

function findDown(rows, activeRow, activeColumn) {
  const range = rows.reduce(
    (range, row) => {
      const cell = row[activeColumn];

      if (range.start !== false && range.end !== false && range.found) {
        range.count++;
        return range;
      }
      if (!range.found && range.start === false) {
        range.start = range.count;
        range.word = "";
      }
      if (!cell.isBlackSquare) {
        range.word += (cell.value.length > 0 ? cell.value : "-");
      }
      if (cell.isBlackSquare && range.found) {
        range.end = range.count - 1;
      }
      if (range.count === activeRow) {
        range.found = true;
      }
      if (cell.isBlackSquare && !range.found) {
        range.start = false;
      }
      if (!range.end && range.count === rows.length - 1) {
        range.end = range.count;
      }

      range.count++;
      return range;
    },
    { count: 0, start: false, end: false, found: false, word: "" }
  );

  return { range: [range.start, range.end], word: range.word };
}

function getCellClue({ grid, getNextClueNumber, row, column }) {
  const currentCell = grid[row][column];
  const prevAcrossCell = column > 0 ? grid[row][column - 1] : {};
  const prevDownCell = row > 0 ? grid[row - 1][column] : {};
  const nextAcrossCell = column < grid[0].length - 1 ? grid[row][column + 1] : {};
  const nextDownCell = row < grid.length - 1 ? grid[row + 1][column] : {};
  
  if (currentCell.isBlackSquare) {
    return false;
  }
  if (row === 0 && !nextDownCell.isBlackSquare) {
    return getNextClueNumber();
  }
  if (column === 0 && !nextAcrossCell.isBlackSquare) {
    return getNextClueNumber();
  }
  if (prevAcrossCell.isBlackSquare && column < grid[0].length - 1 && !nextAcrossCell.isBlackSquare) {
    return getNextClueNumber();
  }
  if (prevDownCell.isBlackSquare && row < grid.length - 1 && !nextDownCell.isBlackSquare) {
    return getNextClueNumber();
  }
  return false;
};

function assignClueNumbersToGrid(grid) {
  let clue = 0;
  const getNextClueNumber = () => clue++;
  
  for (let row in grid) {
    for (let cell in row) {
      console.log("looking at row", row, "and cell", cell);
    }
  }
}

function measureMyInputText(value) {
    var tmp = document.createElement("span");
    tmp.className = "fakeinput noopacity";
    tmp.innerHTML = value;
    document.body.appendChild(tmp);
    var theWidth = tmp.getBoundingClientRect().width;
    document.body.removeChild(tmp);
    return theWidth;
}

function calculateAllClueNumbers(grid) {
    const inDownWord = grid[0].map(() => false);
    const labelGrid = [];
    let inAcrossWord = false;
    let count = 1;
    let doubleClueChance = false;
    const acrossClues = [];
    const downClues = [];
    for (let r = 0; r < grid[0].length; r++){
      labelGrid.push([]);
      for (let c = 0; c < grid.length; c++){
        if (!inAcrossWord && !grid[r][c].isBlackSquare && c < grid[0].length - 1 && !grid[r][c+1].isBlackSquare) {
          acrossClues.push(count++);
          labelGrid[r].push(count - 1);
          doubleClueChance = true;
          inAcrossWord = true;
        } else if (grid[r][c].isBlackSquare) {
          inAcrossWord = false;
          labelGrid[r].push('X');
        } 
        if (!inDownWord[c] && !grid[r][c].isBlackSquare && r < grid.length - 1 && !grid[r+1][c].isBlackSquare) {
          downClues.push(doubleClueChance ? count - 1 : count++);
          !doubleClueChance ? labelGrid[r].push(count -1) : null;
          inDownWord[c] = true;
        } else if (grid[r][c].isBlackSquare) {
          inDownWord[c] = false;
        } else if (!doubleClueChance) {
          labelGrid[r].push('O')
        }
        doubleClueChance = false;
      }
      inAcrossWord = false;
    }
    return { acrossClues, downClues, labelGrid } ;
  }