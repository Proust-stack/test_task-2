import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { TodosPage } from '../pages/TodosPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={TodosPage} />
        <Route path="/completed" component={TodosPage} />
        <Route path="/active" component={TodosPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
