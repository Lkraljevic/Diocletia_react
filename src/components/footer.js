import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <div className="container footer__items">
                <a href="" className="footer__item footer__item--empty"></a>
                <a href="#" className="disabled link-about footer__item">about us</a>
                <a href="#" className=" link-products footer__item">products</a>
                <a href="#" className="footer__item link-sizeguide">size guide</a>
                <a href="#" className="link-terms footer__item">terms & conditions</a>
                <a href="" className="footer__item footer__item--empty"></a>
                </div>
                <div className="footer__information">
                MB: 91870909 . OIB: 48400130246 .  IBAN: HR83 2330 0031 1000 7763 4  . SWIFT: SOGEHR22
                </div>
            </footer>
        )
    }
}
export default Footer;


