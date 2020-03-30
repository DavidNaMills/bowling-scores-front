import React, { useEffect, Suspense } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { LOGIN, SIGNUP } from './Axios/URLS';

import Navigation from './HOC/Navigation/Navigation';

import Login from './Containers/Access/Login/Login';
import Signup from './Containers/Access/Signup/Signup';
import Landing from './Containers/Landing/Landing';
import loginFormConfig from './formConfigs/loginFormConfig';
import signupFormConfig from './formConfigs/signupFormConfig';
import Spinner from './Components/Spinner/Spinner';
import PlayerGameDetails from './Containers/Game/PlayerGameDetails/PlayerGameDetails';

const Game = React.lazy(()=>import('./Containers/Game/Game'));
const Dashboard = React.lazy(()=>import('./Containers/Dashboard/Dashboard'));
const Logout = React.lazy(()=>import('./Containers/Logout/Logout'));
const SecureRoute = React.lazy(()=>import('./HOC/SecureRoute/SecureRoute'));






// const Game = React.lazy(() => {
//   return new Promise(resolve => {
//     setTimeout(() => resolve(import('./Containers/Game/Game')), 3000);
//   });
// });




const App = (props) => {
  const state = useSelector(state => state);
  const user = state.user;
  const stats = state.stats;

  useEffect(() => {
    props.history.push('/dashboard');
  }, [user]);

  return (
    <div>
      <Switch>
        <Navigation user={user} stats={stats}>
          <Suspense fallback={<Spinner center/>}>

          <Route path='/' exact={true} component={Landing} />
          <Route path='/signup' component={() => <Signup formConfig={signupFormConfig} title='Signup' url={SIGNUP} />} />
          <Route path='/login' component={() => <Login formConfig={loginFormConfig} title='Login' url={LOGIN} />} />
          <Route path='/player' component={PlayerGameDetails} />
          <Route path='/game' component={Game} />

          <SecureRoute path='/dashboard' component={Dashboard} />
          <Route path='/logout' component={Logout} />
          </Suspense>
        </Navigation>
      </Switch>
    </div>
  );
}

export default withRouter(App);
