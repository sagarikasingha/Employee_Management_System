import './App.css';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import CreateEmployeeComponent from './components/CreateEmployeeComponent';

function App() {
  return (
    <div>
      <Router>
        
          <HeaderComponent />
          <div className='container'>
            <Switch>
              <Route path="/" exact component={ListEmployeeComponent } />
              <Route path="/employees" component={ListEmployeeComponent } />
              <Route path="/add-employee/:id" component={CreateEmployeeComponent} />
            </Switch>
          </div>
          <FooterComponent />

      </Router>
    </div>
  );
}

export default App;
