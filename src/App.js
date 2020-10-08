import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import Game from './Game';
import Home from './Home';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/games/:id" component={Game} />
      <Route path="/" component={Home} />
    </Switch>
  </BrowserRouter>
);

export default App;
