import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ContactForm extends Component {
    render() {
        return (
            <section className="container section--contact">
                <h3 className="contact__subtitle">Feel free to contact us about any inquery :)</h3>
                <h2 className="contact__title">Let's Talk! Contact us</h2>
                <div className="contact__message" id="contact-response">Thank you for contacting us!</div>
                <form className="container contact" name="contact-form" id="contact-form">
                    <input type="text" name="name" className="input--white" placeholder="Name:" required />
                    <input type="email" name="email" className="input--white" placeholder="Email:" required />
                    <input type="text" name="subject" className="input--white" placeholder="Subject:" required />
                    <textarea name="message" placeholder="Message:" className="input--white" required></textarea>
                    <div id='recaptcha2' className="g-recaptcha" data-sitekey="6LeHJVcUAAAAAMuPh8-LQHuc7cxCP-TCBzEfpUuK" data-callback="contact_onSubmit" data-size="invisible"></div>
                    <button id="contact_submit"> send </button>
                </form>
                <div className="contact__lists">
                    <div className="contact__list">
                        <a href="https://www.facebook.com/diocletiashoes/" className="contact__item">
                            <div className="contact-item__icon">
                                <img src="./images/icons/facebook_logo.png" alt="" className="contact-item__image"/>
                            </div>
                                diocletiashoes
                        </a>
                        <a href="https://www.instagram.com/diocletia_shoes/" className="contact__item">
                            <div className="contact-item__icon">
                                <img src="./images/icons/instagram_logo.png" alt="" className="contact-item__image" />
                            </div>
                            diocletia_shoes
                        </a>
                    </div>
                    <div className="contact__list">
                        <a target="_blank" href="https://www.google.com/maps/place/Trondheimska+ul.+9,+21000,+Split/@43.5097272,16.4766151,17z/data=!4m5!3m4!1s0x13355e3032bc9b7b:0x1e5fb9882b591d6e!8m2!3d43.5097272!4d16.4788038" className="contact__item">
                            <div className="contact-item__icon">
                                <img src="./images/icons/location_icon.png" alt="" className="contact-item__image" />
                            </div> 
                            Trondheimska ul. 9, Split, Croatia
                        </a>
                        <a href="mailto:info@diocletia.hr" className="contact__item">
                            <div className="contact-item__icon">
                                <img src="./images/icons/email_icon.png" alt="" className="contact-item__image" />
                            </div>
                            info@diocletia.hr
                        </a>
                    </div>
                </div>
            </section>
        )}
}

export default ContactForm;  
                    
