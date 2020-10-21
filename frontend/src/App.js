import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Layout from './core/Layout';
import LoginPage from './core/LoginPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import routes from './Routes';

function App() {
  return (
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Layout>
            {routes.map((route)=>{
              return <Route path={route.path} exact={route.exact} component={route.component} />
            })}
          </Layout>
      </Switch>
  );
}

export default App;
