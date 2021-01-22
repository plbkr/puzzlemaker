const React = require('react');
const ReactDOM = require('react-dom');
const Route = require('react-router-dom').Route;
const BrowserRouter = require('react-router-dom').BrowserRouter;
const hashHistory = require('react-router-dom').hashHistory;

/* Import Components */
const Builder = require('./components/Builder');

ReactDOM.render((
  <BrowserRouter onKeyDown={(event) => console.log("a")}>
    <div>
      <Route exact path="/" component={Builder}/>
    </div>
  </BrowserRouter>), document.getElementById('main'));