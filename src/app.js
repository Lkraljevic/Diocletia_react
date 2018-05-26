import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { browserHistory } from 'react-router';

import HomePage from './pages/homepage';
import ModelsPage from './pages/models';

import Header from './components/header';
import Footer from './components/footer';

import Cart from './pages/cart';


class App extends Component {
  render() {
    return (
      <Router>
          <div>
            <Header />
            <Route name="home" exact path="/" component={HomePage} />
            <Route name="models" path="/models/:modelID" component={ModelsPage} />
            <Footer />
            <Cart />
            </div>
      </Router>
    )
  }
}
export default App;