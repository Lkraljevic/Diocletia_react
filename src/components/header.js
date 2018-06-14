import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Header extends Component {
    render() {
        return (
            <header>
                <img src="./images/logo.png" className="logo sticky" alt="" />
                <div className="top-background sticky"></div>
                < DesktopNav {...this.props}/>

                <h1 className="header__title">
                    <div className="header__title--small">Made in Dalmatia</div>
                    <img src="/images/header.png" alt="" />
                    <div className="header__title--small">the Online Store for Women's Shoes</div>
                </h1>
                <div className="header__controls"></div>
                <div className="slider slider--header">
                    <ul className="cb-slideshow">
                        <li><span></span></li>
                        <li><span></span></li>
                        <li><span></span></li>
                        <li><span></span></li>
                        <li><span></span></li>
                        <li><span></span></li>
                    </ul>

                </div>
            </header>
        )
    }
}
export default Header;


class DesktopNav extends Component {
    render() {
        return (
            <nav className="container nav--desktop sticky">
                    <Link to='/' className="link-home nav__link">Home</Link>
                    <Link to='/about/' className="link-about disabled nav__link">About us</Link>
                    <Link to='/contact/' className="link-contact nav__link">Contact</Link>
                    <Link to='/home/' className="link-home nav__link nav__link--logo"></Link>
                    <Link to='/models/model-I/' className="link-products nav__link">Products</Link>
                    <Link to='/sizeguide/' className="link-sizeguide nav__link">Size guide</Link>
                    <a className="link-cart nav__link">
                        <button id="cart-notification" className={this.props.cartSize? "new-item": "empty-cart"} data-cart={this.props.cartSize} onClick={()=>{this.props.toggleCart();}}>
                            <img src="../images/icons/cart_icon.png" alt=""/> Cart
                        </button>
                    </a>
                </nav>
    )}
}