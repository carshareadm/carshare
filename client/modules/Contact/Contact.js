//Import react
import React, { Component, PropTypes } from 'react'; 
import styles from './Contact.css'

//Create a component class
export class Contact extends Component {

  render() {
    // Here goes our page 
    return (
        <div className={styles.body}>
            <h1 className={styles.title}>Contact Us</h1>

            <p><strong>Need Help?</strong> Please contact us via the telephone numbers listed below or the contact form below.</p>

            <p><strong>Customer Services</strong><br />
            Services available 7am - 7pm</p>

            <p className={styles.phoneNum}>1300 000 123</p>

            <p><strong>ShaCar Office Address:</strong><br />
            1 Flinders St,<br />
            Melbourne, Victoria</p>

            <p><strong>Contact Form</strong><br /></p>
            <form>
                <label className={styles.labels} for="firstName">
                    <div className={styles.labelText}>First Name *</div>
                    <input type="text" name="firstName" id="firstName" />
                </label>
                <label className={styles.labels} for="lastName">
                    <div className={styles.labelText}>Last name *</div>
                    <input type="text" name="lastName" id="lastName"/>
                </label>
                <label className={styles.labels} for="emailAddr">
                    <div className={styles.labelText}>Email *</div>
                    <input type="text" name="emailAddr" id="emailAddr"/>
                </label>
                <label className={styles.labels} for="messageText">
                    <div className={styles.labelText}>Message</div>
                    <input type="textArea" name="messageText" id="messageText"/>
                </label>
                <input type="submit" value="Submit" />
            </form>

        </div>
    );
  }
}

export default Contact;