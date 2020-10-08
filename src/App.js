import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import Game from './views/Game';
import Home from './views/Home';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/games/:id" component={Game} />
      <Route path="/" component={Home} />
    </Switch>
  </BrowserRouter>
);

export default App;
