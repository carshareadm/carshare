// PaymentDetails.js
import React, { Component, PropTypes } from "react";
import {
  Alert,
  Button,
  FormGroup,
  Label,
  Input,
  Form,
  FormFeedback,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  Row,
  Col,
} from "reactstrap";
import { Link } from "react-router";
import * as http from "../../util/http";

import * as ccCheck from "credit-card";
import styles from "./PaymentDetails.css";

const now = new Date(Date.now());
const yearNow = now.getFullYear();
const selYears = Array.from([0, 1, 2, 3, 4], x => (yearNow + x).toFixed());
const selMonths = [
  '01', '02', '03', '04', '05', '06',
  '07', '08', '09', '10', '11', '12']

const nonDigit = /[^0-9]/g;

class PaymentDetails extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      // credit card fields
      cardNumber: '',
      nameOnCard: '',
      ccv: '',
      expiryMonth: '',
      expiryYear: '',
      // page state
      updated: false,
      expMonthDropdownOpen: false,
      expYearDropdownOpen: false,
      touched: {
        cardNumber: false,
        nameOnCard: false,
        ccv: false,
        expiry: false,
      },
    };
  }

  valids = {};

  validate() {
    const cardNumber = this.state.cardNumber.replace(nonDigit, '');
    const cardType = ccCheck.determineCardType(cardNumber);
    const ccv = this.state.ccv.replace(nonDigit, '');

    const valids = {
      cardNumber: cardType && ccCheck.luhn(cardNumber),
      nameOnCard: this.state.nameOnCard.length > 0,
      ccv: ccCheck.doesCvvMatchType(ccv, cardType),
      expiry: !ccCheck.isExpired(this.state.expiryMonth, this.state.expiryYear),
    }
    console.log(valids);
    return valids;
  }

  handleInputChange(evt) {
    let field = evt.target.id;
    let value = evt.target.value
    let props = {};
    props [field] = value;
    props.touched = this.state.touched;
    props.touched [field] = true;
    this.setState(props);
    console.log(this.state.touched);
  }

  handleExpiryMonthChange(evt) {
    let props = {
      expiryMonth: evt.target.innerText,
      expMonthDropdownOpen: false }
    props.touched = this.state.touched;
    props.touched.expiry = true;
    this.setState(props);
    console.log(this.state.touched);
  }

  handleExpiryYearChange = (evt) => {
    let props = {
      expiryYear: evt.target.innerText,
      expYearDropdownOpen: false }
    props.touched = this.state.touched;
    props.touched.expiry = true;
    this.setState(props);
    console.log(this.state.touched);
  }

  toggleExpMonthDropdown() {
    this.setState({
      expMonthDropdownOpen: !this.state.expMonthDropdownOpen,
    });
  }

  toggleExpYearDropdown() {
    this.setState({
      expYearDropdownOpen: !this.state.expYearDropdownOpen,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();

    const cardNumber = this.state.cardNumber.replace(nonDigit, '');
    const ccv = this.state.ccv.replace(nonDigit, '');

    if (this.formIsValid()) {
      http.client().put('/paymentDetals/change', {
        cardNumber: cardNumber,
        nameOnCard: this.state.nameOnCard,
        ccv: ccv,
        expiryMonth: Number(this.state.expiryMonth),
        expiryYear: Number(this.state.expiryYear),
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));
    }
  }

  isValid(key) {
    const valid = this.valids[key];
    const touched = this.state.touched[key];
    return valid || !touched;
  }

  formIsValid() {
    return Object.keys(this.valids).some(field => this.valids[field] === false);
  }

  mapUserToModel(user)
  {
    if (user)
    {
      this.setState({
        cardNumber: user.creditCard && user.creditCard.cardNumber ?
          user.creditCard.cardNumber : '',
        nameOnCard: user.creditCard && user.creditCard.nameOnCard ?
          user.creditCard.nameOnCard : '',
        ccv: user.creditCard && user.creditCard.ccv ? user.creditCard.ccv : '',
        expiryMonth: user.creditCard && user.creditCard.expiryMonth ?
          user.creditCard.expiryMonth : '',
        expiryYear: user.creditCard && user.creditCard.expiryYear ?
          user.creditCard.expiryYear : '',
      })
    }
  }

  componentDidMount()
  {
    http
      .client()
      .get('/paymentDetails/my')
      .then((res) => { this.mapUserToModel(res.data) })
      .catch((err) => { console.log(err) });
  }

  render()
  {
    this.valids = this.validate();
    const isDisabled = !this.formIsValid();

    return (
      <div className={styles.body}>
        <h1 className={styles.title}>Payment Details</h1>

        <Form
          className="novalidate"
          onSubmit={this.handleSubmit.bind(this)}>
          <Row>
            <Col>
              <FormGroup>
                <Label for="cardNumber">Credit Card Number</Label>
                <Input
                  type="text"
                  name="cardNumber"
                  id="cardNumber"
                  placeholder="Card number"
                  className={this.isValid('cardNumber') ? '' : 'is-invalid'}
                  value={this.state.cardNumber}
                  onChange={this.handleInputChange.bind(this)}
                />
                <FormFeedback>
                  A valid credit card number is required.
                </FormFeedback>
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col xs="7">
              <FormGroup>
                <Label for="expiry">Expiry</Label>
                <div>
                <ButtonDropdown
                  isOpen={this.state.expMonthDropdownOpen}
                  toggle={this.toggleExpMonthDropdown.bind(this)}
                >
                  <DropdownToggle caret>
                    {this.state.expiryMonth ?
                      this.state.expiryMonth : 'MM'}
                  </DropdownToggle>
                  <DropdownMenu>
                    {selMonths.map(mm => (
                      <DropdownItem
                        key={mm}
                        onClick={this.handleExpiryMonthChange.bind(this)}
                      >
                        {mm}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </ButtonDropdown>
                &nbsp;/&nbsp;
                <ButtonDropdown
                  isOpen={this.state.expYearDropdownOpen}
                  toggle={this.toggleExpYearDropdown.bind(this)}
                >
                  <DropdownToggle caret>
                    {this.state.expiryYear ?
                    this.state.expiryYear : 'YYYY'}
                  </DropdownToggle>
                  <DropdownMenu>
                  {selYears.map(yyyy => (
                    <DropdownItem
                      key={yyyy}
                      onClick={this.handleExpiryYearChange.bind(this)}
                    >
                      {yyyy}
                    </DropdownItem>
                  ))}
                  </DropdownMenu>
                </ButtonDropdown>
                </div>
                <Input
                  type="hidden"
                  name="expiry"
                  id="expiry"
                  className={this.isValid('expiry') ? '' : 'is-invalid'}
                  />
                <FormFeedback>
                  Card should not be expired. A valid expiry date is required.
                </FormFeedback>
              </FormGroup>
            </Col>

            <Col xs="5">
              <FormGroup>
                <Label for="ccv">CVV</Label>
                <Input
                  type="text"
                  name="ccv"
                  id="ccv"
                  placeholder="CVV"
                  className={this.isValid('ccv') ? '' : 'is-invalid'}
                  value={this.state.ccv}
                  onChange={this.handleInputChange.bind(this)}/>
                <FormFeedback>
                  A valid CVV is required.
                </FormFeedback>
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <FormGroup>
                <Label for="nameOnCard">Name on Card</Label>
                <Input
                  type="text"
                  name="nameOnCard"
                  id="nameOnCard"
                  placeholder="Name on card"
                  className={this.isValid('nameOnCard') ? '' : 'is-invalid'}
                  value={this.state.nameOnCard}
                  onChange={this.handleInputChange.bind(this)}/>
                <FormFeedback>
                  Name on card is required.
                </FormFeedback>
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col sm={{ size: 6, offset: 3 }}>
              <Button
                disabled={isDisabled}
                outline
                color="success"
                size="lg"
                block
              >
                Save
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }

//   updated()
//   {
//     return (
//       <Alert color="success">
//         <h4 className="alert-heading">Payment details have been updated!</h4>
//         <p><Link to="/profile">Click here to return to Profile</Link></p>
//         <p><Link to="/">Click here to return home</Link></p>
//       </Alert>
//     );
//   }
//

}

export default PaymentDetails;
