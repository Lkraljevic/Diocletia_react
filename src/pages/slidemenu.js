import React, { Component } from 'react';


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
              <a className="link-home menu__item">Home</a>
              <a className="link-about menu__item">About us</a>
               <a className="link-contact menu__item">Contact</a>
              <a className="link-products menu__item">Products</a>
             <a className="link-sizeguide menu__item size-guide-link">Size guide</a>
             <button data-cart="2" className="menu__button">
                <img src="./images/icons/cart_icon.png" alt="" /> Cart
                </button>
          </div>
        </div>
        );
    }

}





export default SlideMenu;