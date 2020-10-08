import React from 'react';
import TurnContext from '../contexts/TurnContext';

const turn = InnerComponent => (props) => (
  <TurnContext.Consumer>
    {turnContext => <InnerComponent {...props} turn={turnContext} />}
  </TurnContext.Consumer>
);

export default turn;
