import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './interface/Header';
import Index from './interface/Index';
import NoMatch from './interface/NoMatch';

const App = () => {



  return (
    <Fragment>
      
      <header className="header">
        <Header />
      </header>
      
      <main className="output">


        <Switch>
          <Route exact path="/">
            <Index />
          </Route>
          
          <Route>
            <NoMatch />
          </Route>
        </Switch>
        

      </main>
    </Fragment>
  );
}
export default App;
