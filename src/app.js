import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
//import { browserHistory } from 'react-router';

// import {hr_HR, en_US} from './pages/lang';
import HomePage from './pages/homepage';
import ModelsPage from './pages/models';

import Header from './components/header';
import Footer from './components/footer';

import Cart from './pages/cart';
import SlideMenu from './pages/slidemenu';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showCart: false,
      showSizeGuide: false,
      showSlideMenu: false,
    }

    // CART
    this.cart = React.createRef();
    this.addToCart = this.addToCart.bind(this);
    this.cartUpdate = this.cartUpdate.bind(this);
    this.toggleCart = this.toggleCart.bind(this);

    // SIDEBAR
    this.sidebar = React.createRef();
    this.toggleSideMenu = this.toggleSideMenu.bind(this);
  }
  render() {
    let cart = {
      toggleCart: this.toggleCart,
      cartSize: (this.state.cart? this.state.cart.items.size: 0),
    }
    let sideMenu = {
      toggleSideMenu: this.toggleSideMenu,
      showSlideMenu: this.state.showSlideMenu
    }

    let path = (window.location.origin == "https://diocletia.hr") ? "/Diocletia_react/dist":"";
    return (
      
      <Router>
          <div>
            <Header lang = {this.props.lang} 
            cart ={cart} 
            sideMenu={sideMenu} 
             />


            <Route name="home" exact path={path+"/"} render={(props)=>
            <HomePage {...props} />} />

            <Route name="models" path={path+"/models/:modelID"} render={(props)=>
              <ModelsPage {...props} addToCart={this.addToCart}/>
              }/>

            <Footer  toggleCart={this.toggleCart} />

            <Cart onCartUpdate = {this.cartUpdate} shown={this.state.showCart} ref={this.cart} toggleCart={this.toggleCart} />

            <SlideMenu ref={this.sidebar} 
            shown={this.state.showSlideMenu} 
            toggleSideMenu={this.toggleSideMenu} 
            cart ={cart}  /> />
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

  toggleSideMenu() {
    this.setState((prevState, props)=>{
      return {showSlideMenu: !prevState.showSlideMenu}
    })
  }

  cartUpdate(cart) {
    this.setState({cart})
  }


}
export default App;