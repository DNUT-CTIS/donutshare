import { Route } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import Homepage from './pages/Homepage';

function App() {
  return (
      <div className='App'>
            <Route path='/' component={Homepage} exact/>
            <Route path='/dashboard' component={Dashboard} />
          
      </div>

  );
}

export default App;
