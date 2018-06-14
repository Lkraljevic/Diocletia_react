import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { browserHistory } from 'react-router';

import {hr_HR, en_US} from './pages/lang';
import HomePage from './pages/homepage';
import ModelsPage from './pages/models';

import Header from './components/header';
import Footer from './components/footer';

import Cart from './pages/cart';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showCart: false,
      showSizeGuide: false,
    }
    this.cart = React.createRef();
    this.addToCart = this.addToCart.bind(this);
    this.cartUpdate = this.cartUpdate.bind(this);

    this.toggleCart = this.toggleCart.bind(this);
  }
  render() {
    return (
      <Router>
          <div>
            <Header lang = {this.props.lang} toggleCart={this.toggleCart} cartSize={(this.state.cart? this.state.cart.items.size: 0)}/>
            <Route name="home" exact path="/" render={(props)=>
            <HomePage {...props} />} />
            <Route name="models" path="/models/:modelID" render={(props)=>
              <ModelsPage {...props} addToCart={this.addToCart}/>
              }/>
            <Footer  toggleCart={this.toggleCart} />
            <Cart onCartUpdate = {this.cartUpdate} shown={this.state.showCart} ref={this.cart} toggleCart={this.toggleCart} />
            </div>
      </Router>
    )
  }
  
  addToCart(modelItem, shoeSize, quantity) {
    this.cart.current.addItem(modelItem, shoeSize, quantity);
  }

  toggleCart() {
    this.setState((prevState, props)=>{
      return {showCart: !prevState.showCart}
    })
  }

  cartUpdate(cart) {
    this.setState({cart})
  }


}
export default App;