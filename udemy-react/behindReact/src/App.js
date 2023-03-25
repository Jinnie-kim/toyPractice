import React, { useState, useCallback } from 'react';
import Button from './components/UI/Button/Button';

import './App.css';
import DemoOutput from './components/Demo/DemoOutput';

function App() {
  const [showParagraph, setShowParagraph] = useState(false);
  const [allowToggle, setAllowToggle] = useState(false);

  console.log('App Running');

  const onClick = useCallback(() => {
    if (allowToggle) {
      setShowParagraph((prevState) => !prevState);
    }
  }, [allowToggle]);

  const allowToggleHandler = () => {
    setAllowToggle(true);
  };

  return (
    <>
      <div className="app">
        <h1>Hi there!</h1>
        <DemoOutput show={showParagraph} />
        <Button onClick={allowToggleHandler}>Allow Toggling</Button>
        <Button onClick={onClick}>show Paragraph</Button>
      </div>
    </>
  );
}

export default App;
