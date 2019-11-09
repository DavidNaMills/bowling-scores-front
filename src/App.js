import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { LOGIN, SIGNUP } from './Axios/URLS';

import Navigation from './HOC/Navigation/Navigation';

import AccessContainer from './Containers/AccessContainer/AccessContainer';
import Landing from './Containers/Landing/Landing';
import loginFormConfig from './formConfigs/loginFormConfig';
import signupFormConfig from './formConfigs/signupFormConfig';
import Game from './Containers/Game/Game'

import PlayerGameDetails from './Containers/Game/PlayerGameDetails/PlayerGameDetails';


function App() {

  return (
    <div>
      <Switch>
        <Navigation>
          <Route path='/' exact={true} component={Landing} />
          <Route path='/signup' component={() => <AccessContainer formConfig={signupFormConfig} title='Signup' url={SIGNUP} />} />
          <Route path='/login' component={() => <AccessContainer formConfig={loginFormConfig} title='Login' url={LOGIN} />} />
          <Route path='/player' component={PlayerGameDetails} />
          <Route path='/game' component={Game} />
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

export default App;
