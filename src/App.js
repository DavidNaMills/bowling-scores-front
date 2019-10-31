import React from 'react';

import Title from './Components/StandAloneComponents/Title/Title';
import Button from './Components/StandAloneComponents/Button/Button'
import Input from './Components/Form/elements/Input/Input';
import AccessContainer from './Containers/AccessContainer/AccessContainer';

import loginFormConfig from './formConfigs/loginFormConfig';
import signupFormConfig from './formConfigs/signupFormConfig';

const testLabel = 'Bowling Scores';


function App() {

  return (
    <div>
      <AccessContainer formConfig={loginFormConfig} title='Login'  />
      {/* <AccessContainer formConfig={signupFormConfig} title='Signup'  /> */}
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
