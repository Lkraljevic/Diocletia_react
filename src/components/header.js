import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Header extends Component {
    render() {
        return (
            <header>
                <img src="./images/logo.png" class="logo sticky" alt="" />
                <div class="top-background sticky"></div>
                < DesktopNav />

                <h1 className="header__title">
                    <div class="header__title--small">Made in Dalmatia</div>
                    <img src="./images/header.png" alt="" />
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
                    <a className="link-home nav__link">Home</a>
                    <a className="disabled link-about nav__link">About us</a>
                    <a className="link-contact nav__link">Contact</a>
                    <a className="link-home nav__link nav__link--logo"></a>
                    <a className="link-products nav__link">Products</a>
                    <a className="link-sizeguide nav__link">Size guide</a>
                    <a className="link-cart nav__link" id="cart-btn">
                        <button id="cart-notification" className="empty-cart" data-cart="0">
                            <img src="../images/icons/cart_icon.png" alt="" /> Cart
                        </button>
                    </a>
                </nav>
    )}
}