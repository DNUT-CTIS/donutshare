
import { Button } from '@chakra-ui/react';
import { Route } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/HomePage';

function App() {
  return (
    <div className="App">
      <Route path="/" component={HomePage} />
      <Route path="/" component={HomePage} />
    </div>
  );
}

export default App;
