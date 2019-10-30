import React from 'react';

import Title from './Components/StandAloneComponents/Title/Title';
// import Button from './Components/StandAloneComponents/Button/Button'

const testLabel = 'Bowling Scores';


function App() {
  return (
    <div>
      <Title label={testLabel} ttlType='main'/>
      <Title label={testLabel} ttlType='section'/>
      <Title label={testLabel} ttlType='sub'/>
    </div>
  );
}

/* <Button label='Test'/>
<Button label='Test' type='warning'/>
<Button label='Test' type='danger'/> */


export default App;
