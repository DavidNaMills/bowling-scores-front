import React from 'react';

import Button from './Components/StandAloneComponents/Button/Button'

function App() {
  return (
    <div>
      <Button label='Test'/>
      <Button label='Test' type='warning'/>
      <Button label='Test' type='danger'/>
    </div>
  );
}

export default App;
