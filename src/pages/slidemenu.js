import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

class SlideMenu extends Component {
    constructor(props) {
        super(props);
        console.log(props);
       
    }
    render() {
        
        return(
          <div className={"sidenav-wrapper" + (this.props.shown ? ' open': ' closed')}>
            <div className="closebtn" onClick = {this.props.toggleSideMenu} >&times;</div>
            <div className="sidenav">
                <a className="link-home menu__item" onClick={this.handleClick.bind(this,'/')}>Home</a>
                <a className="link-about menu__item" onClick={this.handleClick.bind(this,'/about/')}>About us</a>
               <a className="link-contact menu__item" onClick={this.handleClick.bind(this,'/contact/')}>Contact</a>
                <a className="link-products menu__item" onClick={this.handleClick.bind(this,'/models/model-I/')}>Products</a>
                <a className="link-sizeguide menu__item size-guide-link">Size guide</a>
             <button className={"menu__button "+ (this.props.cart.cartSize? "new-item": "empty-cart")} data-cart={this.props.cart.cartSize} onClick={()=>{
                 this.props.toggleSideMenu();
                 this.props.cart.toggleCart();
                 }}>
                <img src="../images/icons/cart_icon.png" alt="" /> Cart
                </button>
          </div>
        </div>
        );
    }

    handleClick(url) {
        this.props.toggleSideMenu();
        this.props.history.push(url);
    }

}






export default withRouter(SlideMenu);