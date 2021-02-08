import React, { Fragment, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './interface/Header';
import Index from './interface/Index';
import NoMatch from './interface/NoMatch';

const App = () => {

  const [alert, setAlert] = useState({
    message: '',
    alertType: ''
  })

  return (
    <Fragment>
      
      <header className="header">
        <Header alert={alert} />
      </header>
      
      <main className="output">


        <Switch>
          <Route exact path="/">
            <Index setAlert={setAlert} />
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
