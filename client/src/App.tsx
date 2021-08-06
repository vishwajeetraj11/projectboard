import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Board } from './pages/Board';
import { Home } from './pages/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/board' exact component={Board} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
