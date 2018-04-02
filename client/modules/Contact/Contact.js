//Import react
import React, { Component, PropTypes } from 'react'; 
import styles from './Contact.css'

//Create a component class
export class Contact extends Component {

  render() {
    // Here goes our page 
    return (
        <div className={styles.body}>
            <div className="row no-gutters">
                <h1 className={styles.title}>Contact Us</h1>
            </div>
            <div className="row no-gutters">
                <div className="col-xs-12 col-md-6">
                    <p><strong>Need Help?</strong><br/>
                    Please contact us via the telephone numbers listed below or the contact form above.</p>

                    <p><strong>Customer Services</strong><br />
                    Services available 7am - 7pm</p>

                    <p className={styles.phoneNum}>1300 000 123</p>

                    <p><strong>ShaCar Office Address:</strong><br />
                    1 Flinders St,<br />
                    Melbourne, Victoria</p>
                </div>
                <div className="col-xs-12 col-md-6">
                    <p><strong>Contact Form</strong><br /></p>
                    <form>
                        <label className={styles.labels} htmlFor="title">
                            <div className={styles.labelText}>Title *</div>
                            <input type="text" name="firstName" id="title" placeholder="Please Enter"/>
                        </label>
                        <label className={styles.labels} htmlFor="firstName">
                            <div className={styles.labelText}>First Name *</div>
                            <input type="text" name="firstName" id="firstName" placeholder="Please Enter"/>
                        </label>
                        <label className={styles.labels} htmlFor="lastName">
                            <div className={styles.labelText}>Last name *</div>
                            <input type="text" name="lastName" id="lastName" placeholder="Please Enter"/>
                        </label>
                        <label className={styles.labels} htmlFor="emailAddr">
                            <div className={styles.labelText}>Email *</div>
                            <input type="text" name="emailAddr" id="emailAddr" placeholder="Please Enter"/>
                        </label>
                        <label className={styles.labels} htmlFor="messageText">
                            <div className={styles.labelText}>Message</div>
                            <input type="textArea" name="messageText" id="messageText" placeholder="Please Enter"/>
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        </div>
    );
  }
}

export default Contact;