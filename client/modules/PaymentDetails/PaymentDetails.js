/**
 * Project       - ShaCar
 * Team          - Group 3 Carshare
 * Last Modified - 2018/05/25
 * Authors
 *               - Jason Koh
 */
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
  Row,
  Col,
} from "reactstrap";
import { Link } from "react-router";
import * as http from "../../util/http";

import * as cardValidate from "card-validator";
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
      // credit card info
      _id: '',
      cardNumber: '',
      oldCard: '',
      nameOnCard: '',
      expiryMonth: '',
      expiryYear: '',
      // user credit card status
      hasCard: false,
      // page state
      updated: false,
      expMonthDropdownOpen: false,
      expYearDropdownOpen: false,
      successAlertOpen: false,
      failAlertOpen: false,
      touched: {
        cardNumber: false,
        nameOnCard: false,
        ccv: false,
        expiry: false,
      },
    };
  }

  valids = {};

  validate()
  {
    const cardNumber = this.state.cardNumber.replace(nonDigit, '');
    const checkResult = cardValidate.number(cardNumber);
    const expiry = this.state.expiryMonth + this.state.expiryYear;

    const valids = {
      cardNumber: checkResult.isValid ||
        (this.state.hasCard && cardNumber.length === 0),
      nameOnCard: this.state.nameOnCard.length > 0,
      expiry: cardValidate.expirationDate(expiry).isValid,
    }
    return valids;
  }

  handleInputChange(evt)
  {
    let field = evt.target.id;
    let value = evt.target.value
    let temp = {};
    temp [field] = value;
    temp.touched = this.state.touched;
    temp.touched [field] = true;
    this.setState(temp);
  }

  handleExpiryMonthChange(evt)
  {
    let temp = {
      expiryMonth: evt.target.innerText,
      expMonthDropdownOpen: false }
    temp.touched = this.state.touched;
    temp.touched.expiry = true;
    this.setState(temp);
  }

  handleExpiryYearChange(evt)
  {
    let temp = {
      expiryYear: evt.target.innerText,
      expYearDropdownOpen: false }
    temp.touched = this.state.touched;
    temp.touched.expiry = true;
    this.setState(temp);
  }

  toggleExpMonthDropdown()
  {
    this.setState({
      expMonthDropdownOpen: !this.state.expMonthDropdownOpen,
    });
  }

  toggleExpYearDropdown()
  {
    this.setState({
      expYearDropdownOpen: !this.state.expYearDropdownOpen,
    });
  }

  dismissSuccess() {
    this.setState({ successAlertOpen: false })
  }

  dismissFail() {
    this.setState({ failAlertOpen: false })
  }

  handleSubmit(evt) {
    evt.preventDefault();

    if (this.formIsValid()) {
      const cardNumber = this.state.cardNumber.replace(nonDigit, '');
      const card = {
        nameOnCard: this.state.nameOnCard,
        expiryMonth: Number(this.state.expiryMonth),
        expiryYear: Number(this.state.expiryYear),
      };

      // add cardnumber only if changed / new.
      if (this.state.cardNumber)
      {
        card.cardNumber = this.state.cardNumber;
      }

      if (this.state.hasCard)
      {
        // update credit card info only
        card._id = this.state._id;
        http
          .client()
          .put('/paymentDetails/update', card)
          .then(res => {
            console.log(res);
            this.setState({ successAlertOpen: true })
            this.fetchUser();
          })
          .catch(err => {
            console.log(err);
            this.setState({ failAlertOpen: true })
          })
      }
      else
      {
        // create new creditCard
        http
          .client()
          .post('/paymentDetails/add', card)
          .then(res => {
            console.log(res);
            this.setState({ successAlertOpen: true })
            this.fetchUser();
          })
          .catch(err => {
            console.log(err);
            this.setState({ failAlertOpen: true })
          })
      }
    }
  }

  isValid(key)
  {
    const valid = this.valids[key];
    const touched = this.state.touched[key];
    return valid || !touched;
  }

  formIsValid()
  {
    return Object.keys(this.valids).every(field => this.valids[field] === true);
  }

  mapUserToModel(user)
  {
    if (user && user.creditCard)
    {
      this.setState({
        _id: user.creditCard._id ? user.creditCard._id : '',
        // only the last 4 digits are retrieved
        oldCard: user.creditCard.lastFourDigits ?
          'Card ending in … ' + user.creditCard.lastFourDigits :
          'No card on record',
        nameOnCard: user.creditCard.nameOnCard ?
          user.creditCard.nameOnCard : '',
        expiryMonth: user.creditCard.expiryMonth ?
          selMonths[user.creditCard.expiryMonth - 1] : '',
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
      .then((res) => {
        console.log(res);
        this.mapUserToModel(res.data);
       })
      .catch((err) => { console.log(err) });
  }

  render()
  {
    this.valids = this.validate();
    const isDisabled = !this.formIsValid();

    return (
      <div className={styles.body}>
        <h1 className={styles.title}>Payment Details</h1>
        <Row noGutters>
          <Col>
            <Form
              noValidate
              onSubmit={this.handleSubmit.bind(this)}>
              <FormGroup>
                <Label for="oldCard">Existing Credit Card</Label>
                <Input
                  type="text"
                  readOnly
                  name="oldCard"
                  id="oldCard"
                  value={this.state.oldCard}
                />
              </FormGroup>

              <FormGroup>
                <Label for="cardNumber">New Credit Card Number</Label>
                <Input
                  type="text"
                  name="cardNumber"
                  id="cardNumber"
                  placeholder="Leave blank if card number unchanged"
                  className={this.isValid('cardNumber') ? '' : 'is-invalid'}
                  value={this.state.cardNumber}
                  onChange={this.handleInputChange.bind(this)}
                />
                <FormFeedback>
                  A valid credit card number is required.
                </FormFeedback>
              </FormGroup>

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
                  Card should not be expired. A card with valid expiry
                  date is required.
                </FormFeedback>
              </FormGroup>

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

              <Button
                type="submit"
                disabled={isDisabled}
                outline
                color="success"
                block
              >
                Save
              </Button>
            </Form>
          </Col>
        </Row>
        <Alert
          color="success"
          isOpen={this.state.successAlertOpen}
          toggle={this.dismissSuccess.bind(this)}
        >
          Your payment details have been updated!
        </Alert>
        <Alert
          color="danger"
          isOpen={this.state.failAlertOpen}
          toggle={this.dismissFail.bind(this)}
        >
          Sorry, we encountered a problem updating your payment details.
          Please try again, or contact us on <strong>1300 000 123</strong>.
        </Alert>
      </div>
    )
  }
}

export default PaymentDetails;
