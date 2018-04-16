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

import * as ccCheck from "card-validator";
import styles from "./PaymentDetails.css";

const now = new Date(Date.now());
const yearNow = now.getFullYear();
const selYears = new Array(yearNow, yearNow + 1, yearNow + 2, yearNow + 3, yearNow + 4);
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
      _id: '',
      cardNumber: '',
      nameOnCard: '',
      ccv: '',
      expiryMonth: '',
      expiryYear: '',
      // user credit card status
      hasCard: false,
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
    const ccv = this.state.ccv.replace(nonDigit, '');
    const checkResult = ccCheck.number(cardNumber);
    const expiry = this.state.expiryMonth + this.state.expiryYear;
    const ccvLength =
      (checkResult.card && checkResult.card.type) ?
      checkResult.card.code.size : null;

    const valids = {
      cardNumber: checkResult.isValid,
      nameOnCard: this.state.nameOnCard.length > 0,
      ccv: ccvLength && ccv.length === ccvLength,
      expiry: ccCheck.expirationDate(expiry).isValid,
    }
    return valids;
  }

  handleInputChange(evt) {
    let field = evt.target.id;
    let value = evt.target.value
    let temp = {};
    temp [field] = value;
    temp.touched = this.state.touched;
    temp.touched [field] = true;
    this.setState(temp);
  }

  handleExpiryMonthChange(evt) {
    let temp = {
      expiryMonth: evt.target.innerText,
      expMonthDropdownOpen: false }
    temp.touched = this.state.touched;
    temp.touched.expiry = true;
    this.setState(temp);
  }

  handleExpiryYearChange = (evt) => {
    let temp = {
      expiryYear: evt.target.innerText,
      expYearDropdownOpen: false }
    temp.touched = this.state.touched;
    temp.touched.expiry = true;
    this.setState(temp);
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

    if (this.formIsValid()) {
      const cardNumber = this.state.cardNumber.replace(nonDigit, '');
      const ccv = this.state.ccv.replace(nonDigit, '');

      if (this.state.hasCard) {
        // update credit card info only
        http
          .client()
          .put('/paymentDetails/update', {
            _id: this.state._id,
            cardNumber: cardNumber,
            nameOnCard: this.state.nameOnCard,
            ccv: ccv,
            expiryMonth: Number(this.state.expiryMonth),
            expiryYear: Number(this.state.expiryYear),
          })
          .then(res => {
            console.log(res);
            this.fetchUser();
          })
          .catch(err => console.log(err));
      }
      else
      {
        // create new creditCard
        http
          .client()
          .post('/paymentDetails/add', {
            cardNumber: cardNumber,
            nameOnCard: this.state.nameOnCard,
            ccv: ccv,
            expiryMonth: Number(this.state.expiryMonth),
            expiryYear: Number(this.state.expiryYear),
          })
        .then(res => {
          console.log(res);
          this.fetchUser();
        })
        .catch(err => console.log(err));
      }
    }
  }

  isValid(key) {
    const valid = this.valids[key];
    const touched = this.state.touched[key];
    return valid || !touched;
  }

  formIsValid() {
    return Object.keys(this.valids).every(field => this.valids[field] === true);
  }

  mapUserToModel(user)
  {
    if (user && user.creditCard)
    {
      this.setState({
        _id: user.creditCard._id ? user.creditCard._id : '',
        cardNumber: user.creditCard.cardNumber ?
          user.creditCard.cardNumber : '',
        nameOnCard: user.creditCard.nameOnCard ?
          user.creditCard.nameOnCard : '',
        ccv: user.creditCard.ccv ? user.creditCard.ccv : '',
        expiryMonth: user.creditCard.expiryMonth ?
          user.creditCard.expiryMonth.toString() : '',
        expiryYear: user.creditCard.expiryYear ?
          user.creditCard.expiryYear.toString() : '',
        hasCard: true,
      })
    }
  }

  componentDidMount() { this.fetchUser(); }

  fetchUser()
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
                type="submit"
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
