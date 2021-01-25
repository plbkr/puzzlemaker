const React = require("react");
const PuzzleRow = require("./PuzzleRow");
const PuzzleMenu = require("./PuzzleMenu");
const { PuzzleContext } = require("./PuzzleContext");
const { measureMyInputText, getClueLabel } = require("./utils");

const Puzzle = ({ initialGrid }) => {
  const [title, setTitle] = React.useState("Untitled");
  const [author, setAuthor] = React.useState("Author");
  const handleTitleChange = e => {
    e.preventDefault();
    e.target.style.width = measureMyInputText(e.target.id) + 'px';
    setTitle(e.target.value);
  }
  const handleAuthorChange = e => {
    e.preventDefault();
    e.target.style.width = measureMyInputText(e.target.id) + 'px';
    setAuthor(e.target.value);
  }
  
  const clueBreaker = (clue) => {
    var chars = clue.split('');
    console.log(chars);
    return chars.map((char, i) => (
      <span class={char == '-' ? 'emptycell' : ''}>{char}</span>
    ))
  };
  
  return (
    <PuzzleContext.Consumer>
      {puzzle => (
        <div>
          <div class="puzzle-info">
            <input id="title" class="inline-content-editable" style={{ width: '6ch' }} value={title} type="text" onChange={handleTitleChange} />
            <span> by </span>
            <input id="author" class="inline-content-editable" style={{ width: '57px' }} value={author} type="text" onChange={handleAuthorChange} />
          </div>
          <div class="puzzle-container">
            <PuzzleMenu puzzle={puzzle}/>
            <div class="puzzle-grid">
              {puzzle.grid.map((columns, i) => (
                <PuzzleRow
                  key={`row-${i}`}
                  row={i}
                  columns={columns}
                />
              ))}
            </div>
            <div class="current-clues">
              <div id="across">
                <h3>1 Across:</h3>
                <h3>{getClueLabel(puzzle)}</h3>
                <div class="current">{clueBreaker(puzzle.words.across.word.toUpperCase())}</div>
                <div class="suggestions"></div>
              </div>
              <div id="down">
                <h3>1 Down:</h3>
                <div class="current">{clueBreaker(puzzle.words.down.word.toUpperCase())}</div>
                <div class="suggestions"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </PuzzleContext.Consumer>
  );
};

module.exports = Puzzle;