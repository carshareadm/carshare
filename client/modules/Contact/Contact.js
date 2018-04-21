//Import react
import React, { Component, PropTypes } from 'react';
import {
  Alert,
  Button,
  FormGroup,
  Label,
  Input,
  Form,
  FormFeedback,
  Row,
  Col,
} from "reactstrap";
import * as http from "../../util/http";
import * as validator from "validator";
import styles from './Contact.css'

const reset = {
  emailFrom: '',
  name: '',
  message: '',
  priority: 'low',
  // page state
  successAlertOpen: false,
  failAlertOpen: false,
  touched: {
    emailFrom: false,
    message: false,
  },
}

//Create a component class
class Contact extends Component
{
  constructor(props)
  {
    super(props);
    this.state = reset;
  }

  valids = {};

  validate()
  {
    const valids = {
      emailFrom: validator.isEmail(this.state.emailFrom),
      name: this.state.name.length > 0,
      message: this.state.message.length > 0,
    }
    return valids;
  }

  handleInputChange(evt) {
    let field = evt.target.id;
    let value = evt.target.value
    let temp = {};
    temp [field] = value;
    if (!this.state.touched [field])
    {
      temp.touched = Object.create(this.state.touched);
      temp.touched [field] = true;
    }
    this.setState(temp);
  }

  handleSubmit(evt) {
    evt.preventDefault();

    if (this.formIsValid()) {
      http
        .client()
        .post('/contact/add', {
          emailFrom: this.state.emailFrom,
          name: this.state.name,
          message: this.state.message,
          priority: this.state.priority,
        })
      .then(res => {
        console.log(res);
        this.setState({ successAlertOpen: true });
      })
      .catch(err => {
        console.log(err);
        this.setState({ failAlertOpen: true });
      })
    }
  }

  dismissSuccess() {
    this.setState(reset);
  }

  dismissFail() {
    this.setState({ failAlertOpen: false });
  }

  isValid(key) {
    const valid = this.valids[key];
    const touched = this.state.touched[key];
    return valid || !touched;
  }

  formIsValid() {
    return Object.keys(this.valids).every(field => this.valids[field] === true);
  }

  render()
  {
    this.valids = this.validate();
    const isDisabled =
      !this.formIsValid() ||
      this.state.successAlertOpen ||
      this.state.failAlertOpen;
    // Here goes our page
    return (
      <div className={styles.body}>
          <h1 className={styles.title}>Contact Us</h1>
        <Row noGutters>
          <Col xs="12" md="6" className="px-3">
            <p><strong>Need Help?</strong><br/>
            Please contact us via the telephone number below or
            use the contact form.</p>

            <p><strong>Customer Services</strong><br />
            Services available 7am - 7pm</p>

            <p className={styles.phoneNum}>1300 000 123</p>

            <p><strong>ShaCar Office Address:</strong><br />
            1 Flinders St,<br />
            Melbourne, Victoria</p>
          </Col>
          <Col xs="12" md="6" className="px-3">
            <p><strong>Contact Form</strong><br /></p>
            <Form
              className="novalidate"
              onSubmit={this.handleSubmit.bind(this)}
            >

              <FormGroup>
                <Label htmlFor="emailFrom">Email *</Label>
                <Input
                  type="text"
                  name="emailFrom"
                  id="emailFrom"
                  placeholder="Email"
                  className={this.isValid('emailFrom') ? '' : 'is-invalid'}
                  value={this.state.emailFrom}
                  onChange={this.handleInputChange.bind(this)}
                />
                <FormFeedback>
                  A valid email address is required.
                </FormFeedback>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="name">Name *</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Your name"
                  className={this.isValid('name') ? '' : 'is-invalid'}
                  value={this.state.name}
                  onChange={this.handleInputChange.bind(this)}
                />
                <FormFeedback>
                  Name is required.
                </FormFeedback>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="message">Message *</Label>
                <Input
                  type="textarea"
                  rows="5"
                  name="message"
                  id="message"
                  placeholder="Message"
                  className={this.isValid('message') ? '' : 'is-invalid'}
                  value={this.state.message}
                  onChange={this.handleInputChange.bind(this)}
                />
                <FormFeedback>
                  Message is required.
                </FormFeedback>
              </FormGroup>

              <Button
                type="submit"
                disabled={isDisabled}
                outline
                color="success"
                size="lg"
                block
              >
                Submit
              </Button>
            </Form>
            <Alert
              color="success"
              isOpen={this.state.successAlertOpen}
              toggle={this.dismissSuccess.bind(this)}
            >
              Thank you for your enquiry. Your message has been sent!
            </Alert>
            <Alert
              color="danger"
              isOpen={this.state.failAlertOpen}
              toggle={this.dismissFail.bind(this)}
            >
              Sorry, your message failed to send. Please try again,
              or give us a call.
            </Alert>

          </Col>
        </Row>
      </div>
    );
  }
}

export default Contact;
