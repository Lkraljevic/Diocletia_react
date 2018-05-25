import React, { Component } from 'react';
import ModelSelection from '../components/model_selection';
import ContactForm from '../components/contact_form';

class HomePage extends Component {
    render() {
        return (
            <div>
                <section className="container header__hero">
                    Step into Diocletia's world of colors and create your very own custom shoes by choosing colors. <br /><br />Pick your shoes, pick your colors and make them yours !
                </section>
                <ModelSelection />
                <HomeSlider />
                <ContactForm />
            </div>
        )
    }
}
export default HomePage;

                                    
// Home specific components 

class HomeSlider extends Component {
    render() {
        return(
            <section className="slider-wrapper">
                <div className="slider slider--small">

                <div className="show" style={{backgroundImage: 'url("./images/header/slide--2.jpg")'}}></div>
                <div style={{backgroundImage: "url('./images/header/slide--3.jpg')"}}></div>
                <div style={{backgroundImage: "url('./images/header/slide--4.jpg')"}}></div>
                <div style={{backgroundImage: "url('./images/header/slide--1.jpg')"}}></div>
                </div>
                <a className="slider__icon slider__icon--left"></a>
                <a className="slider__icon slider__icon--right"></a>
            </section>
        )
    }
}
