import React from 'react';
import { BrowserRouter as Router, Route, Link,Switch } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css'
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home'
import  SignIn from './pages/SIgnIn'

function App() {
  return (
    <Router>

      <div>
        <div id="container">
          <div id="main">
            <Navbar />
            <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/signIn" component={SignIn}/>
           
            </Switch>
          
           
          </div>
        </div>
        <Footer />
      </div>

    </Router>
  );
}

export default App;
