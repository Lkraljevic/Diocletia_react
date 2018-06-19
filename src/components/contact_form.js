import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import {Recaptcha} from 'react-recaptcha';


class ContactForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: {}
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.submitMesage =this.submitMesage.bind(this);
      }
    render() {
        return (
            <section className="container section--contact">
                <h3 className="contact__subtitle">Feel free to contact us about any inquery :)</h3>
                <h2 className="contact__title">Let's Talk! Contact us</h2>
                <div className="contact__message" id="contact-response">Thank you for contacting us!</div>
                <form className="container contact" name="contact-form" id="contact-form" onSubmit={this.handleSubmit}>
                    <input type="text" name="name" className="input--white" placeholder="Name:" required value={this.state.value.name} onChange={this.handleChange} />
                    {/* <input type="email" name="email" className="input--white" placeholder="Email:" required value={this.state.value.email} onChange={this.handleChange} />
                    <input type="text" name="subject" className="input--white" placeholder="Subject:" required value={this.state.value.subject} onChange={this.handleChange} />
                    <textarea name="message" placeholder="Message:" className="input--white" required value={this.state.value.message} onChange={this.handleChange}></textarea> */}
                    <div id='recaptcha2' className="g-recaptcha" data-sitekey="6LeHJVcUAAAAAMuPh8-LQHuc7cxCP-TCBzEfpUuK" data-callback={this.submitMesage} data-size="invisible"></div> 
                    
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

    componentDidMount() {
        console.log(grecaptcha);
        grecaptcha.ready(()=>{
            console.log(grecaptcha);
            grecaptcha.render('contact_submit', {
                'sitekey' : '6LeHJVcUAAAAAMuPh8-LQHuc7cxCP-TCBzEfpUuK',
                'callback' : this.submitMesage
              });
        })
            
    }



    
    handleChange(event) {
        let value = event.target.value;
        let name = event.target.name;
        
        this.setState((prevState)=>{
            let state  = {...prevState };
            state[name] = value;
            return state;
        });
    }
    
    handleSubmit(event) {
        grecaptcha.execute();
        event.preventDefault();
        
     }
     submitMesage(data) {
        var that = this;
        console.log(this.state.value);

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
          if (this.readyState == 4 && this.status == 200) {
            var responseText = JSON.parse(this.responseText);
            if(responseText.success) {
                console.log(text);
            }
          }
        };
        
        xhttp.open("POST", "https://diocletia.hr/api/contact.php", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify({
            captchaResponse : data,
            formData: this.state.value
        }));
     }
}

export default ContactForm;  
                    





class NameForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      alert('A name was submitted: ' + this.state.value);
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }