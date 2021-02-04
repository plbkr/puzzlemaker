const React = require("react");
const Row = require("./Row");
const Menu = require("./Menu");
const { PuzzleContext } = require("./Context");
const Title = require("./Title");
const CurrentClues = require("./CurrentClues");

const Puzzle = () => {
  const gridSizeDesc = (length) => {
    if (length > 16) {
     return "largegrid";
    } else if (length > 12) {
     return "mediumgrid";
    } else if (length > 8) {
     return "smallgrid";
    } else {
     return "xsgrid";
    }
  };
  
  const gridheight = () => {
    return window.innerHeight - 
      (document.getElementsByClassName("infomenublock")[0].offsetHeight +
       document.getElementsByClassName("current-clues")[0].offsetHeight);
  }

  return (
    <PuzzleContext.Consumer>
      {puzzle => (
        <div>
          <div class="infomenublock" style={{'max-width': ((puzzle.grid[0].length * 40) + 15 )+ 'px'}}>
            <Title
              titleWidth={puzzle.titleWidth}
              authorWidth={puzzle.authorWidth}
              setTitleWidth={puzzle.setTitleWidth}
              setAuthorWidth={puzzle.setAuthorWidth}
              title={puzzle.title}
              author={puzzle.author}
              setTitle={puzzle.setTitle}
              setAuthor={puzzle.setAuthor}
            />
            <Menu puzzle={puzzle} />
          </div>
          <div class="puzzle-container">
            <div class={"puzzle-grid " + gridSizeDesc(puzzle.grid[0].length) + " " + puzzle.zoomed} style={{height: (puzzle.zoomed == 'zoomed' ? gridheight + 'px' : 'auto')}}>
              {puzzle.grid.map((columns, i) => (
                <Row key={`row-${i}`} row={i} columns={columns} />
              ))}
            </div>
            <CurrentClues
              across={puzzle.words.across}
              down={puzzle.words.down}
              puzzle={puzzle}
            />
          </div>
        </div>
      )}
    </PuzzleContext.Consumer>
  );
};

module.exports = Puzzle;
