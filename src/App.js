import React, { useEffect } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { LOGIN, SIGNUP } from './Axios/URLS';

import Navigation from './HOC/Navigation/Navigation';

import AccessContainer from './Containers/AccessContainer/AccessContainer';
import Landing from './Containers/Landing/Landing';
import loginFormConfig from './formConfigs/loginFormConfig';
import signupFormConfig from './formConfigs/signupFormConfig';
import Game from './Containers/Game/Game'
import PlayerGameDetails from './Containers/Game/PlayerGameDetails/PlayerGameDetails';
import Dashboard from './Containers/Dashboard/Dashboard';

import SecureRoute from './HOC/SecureRoute/SecureRoute';


const App = (props) => {
  const token = useSelector(state => state.user.token);

  useEffect(() => {
    props.history.push('/dashboard');
  }, [token]);

  return (
    <div>
      <Switch>
        <Navigation>
          <Route path='/' exact={true} component={Landing} />
          <Route path='/signup' component={() => <AccessContainer formConfig={signupFormConfig} title='Signup' url={SIGNUP} />} />
          <Route path='/login' component={() => <AccessContainer formConfig={loginFormConfig} title='Login' url={LOGIN} />} />
          <Route path='/player' component={PlayerGameDetails} />
          <Route path='/game' component={Game} />

          <SecureRoute path='/dashboard' component={Dashboard} />
          {/* <Redirect to='/' /> */}
        </Navigation>
      </Switch>
    </div>
  );
}


// <div>
//     <Title label={testLabel} ttlType='main'/>
//     <Title label={testLabel} ttlType='section'/>
//     <Title label={testLabel} ttlType='sub'/>
//   <br/>
//     <Button label='Test'/>
//     <Button label='Test' type='warning'/>
//     <Button label='Test' type='danger'/>
//   <br/>
//     <Input id='test' changed={()=>{}} icon label='hello world' />
//     <Input id='test' changed={()=>{}} icon label='hello world' isRequired />
//     <Input id='test' changed={()=>{}} icon label='hello world' isRequired isValid/>
//     <Input id='test' changed={()=>{}} icon label='hello world' error={['sdfa', 'fdsa']}/>
// </div>

export default withRouter(App);
