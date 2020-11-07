import React, { useEffect, useState, } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import AuthContext from './contexts/auth';
import Game from './views/Game';
import Home from './views/Home';
import SignIn from './views/SignIn';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    try {
      setIsAuthenticated(JSON.parse(localStorage.getItem('isAuthenticated') ?? ''));
    } catch {}
  }, [setIsAuthenticated]);

  const updateAuthState = (value: boolean) => {
    localStorage.setItem('isAuthenticated', JSON.stringify(value));
    setIsAuthenticated(value);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, updateAuthState, }}>
      <BrowserRouter>
        <Switch>
          {isAuthenticated
            ? <Route path="/games/:id" component={Game} />
            : null
          }
          {isAuthenticated
            ? <Route path="/" component={Home} />
            : <Route path="/" component={SignIn} />
          }
        </Switch>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
