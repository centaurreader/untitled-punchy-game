import React from 'react';
import {
  BrowserRouter,
  Route,
} from 'react-router-dom';
import Home from './Home';

const App = () => (
  <BrowserRouter>
    <Route path="/" component={Home} />
  </BrowserRouter>
);

export default App;
