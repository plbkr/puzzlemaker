const React = require("react");
                      
const getCellLabel = ({ grid, row, column, getNextClueNumber }) => {
  const currentCell = grid[row][column];
  if (!currentCell) {
    return false;
  }
  if (row === 0) {
    return getNextClueNumber();
  }
  if (column === 0) {
    return getNextClueNumber();
  }
  if (grid[row][column - 1] === false) {
    return getNextClueNumber();
  }
  if (grid[row - 1][column] === false) {
    return getNextClueNumber();
  }
  return false;
};

const PuzzleCell = ({ value, row, column, grid, getNextClueNumber }) => {
  const [cellState, setCellState] = React.useState(false);
  let classes = ["puzzle-cell"];
  if (!value) {
    classes.push("puzzle-cell-x");
  }
  const label = getCellLabel({ row, column, grid, getNextClueNumber });
  return (
    <div class={classes.join(" ")}>
      {value}
      {value && label ? <div class="label">{label}</div> : null}
    </div>
  );
};

module.exports = PuzzleCell;