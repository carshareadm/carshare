import React, { Component, PropTypes } from "react";
import {
  Button,
  Row,
  Col,
  FormGroup,
  Input,
  Label,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Card,
  CardBody,
  CardHeader,
  CardText,
} from "reactstrap";

import {Typeahead} from 'react-bootstrap-typeahead';
import DatePicker from "react-datepicker";
import moment from "moment"

import Loading from '../../../Loading/Loading';
import * as manageSvc from "../../../../services/manage.service";
import stylesMain from '../../../../main.css';
import Car from '../../../Cars/components/Car';

export class BookingAdm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      booking: {...this.props.booking},
      tmpStartsAt: moment(),
      tmpEndsAt: moment(),
      isTouched: {
        isDisabled: false,
        startsAt: false,
        endsAt: false,
      },
      dropdownsOpen: {
        isDisabled: false,
      },
      placeholderOffer: "",
    }
  }
  
  labels = {
    user: 'User',
    car: 'Car',
    startsAt: 'Start Time',
    endsAt: 'End Time',
    unlockCode: 'Unlock Code',
    offer: 'Offer Code',
    isDisabled: 'Booking Status',
    totalCost: 'Booking Cost',
  };

  errors = {};

  errorMsgs = {
    user: '',
    car: '',
    startsAt: 'a valid date and time at least 1 hour in the future is required',
    endsAt: 'a date and time after start time is required',
    unlockCode: 'is required',
    offer: '',
    isDisabled: '',
  };

  validate() {
    const errs = {
      unlockCode: this.state.booking.unlockCode.length < 1,
      startsAt: moment(this.state.booking.startsAt).isSameOrAfter(this.state.booking.endsAt),
      endsAt: moment(this.state.booking.startsAt).isSameOrAfter(this.state.booking.endsAt),
    };
    return errs;
  }

  isError(key) {
    const errorExists = this.errors[key];
    const touched = this.state.isTouched[key] === true;
    return errorExists && touched;
  }

  isFormInvalid() {
    return Object.keys(this.errors).some(x => this.errors[x] === true);
  }

  renderLabel(key, labelFor) {
    if (this.isError(key)) {
      return <Label htmlFor={labelFor} className={'text-danger'}>{this.labels[key]}: {this.errorMsgs[key]}</Label>
    }
    return <Label htmlFor={labelFor} >{this.labels[key]}</Label>
  }

  handleBlur(field) {
    this.setState({
      isTouched: Object.assign({}, this.state.isTouched, { [field]: true }),
    });
  }

  handleInputChange(evt)
  {
    let field = evt.target.id;
    let value = evt.target.value
    this.setState({
      booking: { ...this.state.booking, [field]: value },
      isTouched: { ...this.state.isTouched, [field]: true },
    });
  }

  componentDidMount() {
    if(this.state.booking.offer!=null)
    {
      var tmp = this.state.booking.offer.offerCode;
      this.setState({placeholderOffer: tmp});
    }
  }

  renderTextFormGroup(field) {
    const placeholder = this.labels[field];
    return (
      <FormGroup>
        {this.renderLabel(field, field)}
        <Input
          type="text"
          name={field}
          id={field}
          placeholder={placeholder}
          className={this.isError(field) ? 'is-invalid' : ''}
          onChange={this.handleInputChange.bind(this)}
          onBlur={() => this.handleBlur(field)}
          value={this.state.booking[field]}
        />
      </FormGroup>
    );
  }

  toggleDropDown(field, evt) {
    const dropdownState = {...this.state.dropdownsOpen};
    dropdownState[field] = !dropdownState[field];
    this.setState({dropdownsOpen: dropdownState});
  }

  ddOnSelect(field, value, evt) {
    this.setState({
      booking: {...this.state.booking, [field]: value},
      isTouched: {...this.state.isTouched, [field]: true},
      dropdownsOpen: {...this.state.dropdownsOpen, [field]: false},

    });
  }

  renderDropdownFormGroup(field, options) {

    const opts = options.map(m => (<DropdownItem key={m} onClick={(e) => this.ddOnSelect(field, m, e)}>{m}</DropdownItem>));
    const text = this.state.booking[field];
    return (
      <FormGroup>
          {this.renderLabel(field, field)} <br />
          <ButtonDropdown isOpen={this.state.dropdownsOpen[field]} toggle={(e) => this.toggleDropDown(field, e)}>            
            <DropdownToggle caret size="sm">{text}</DropdownToggle>
            <DropdownMenu>
              {opts}
            </DropdownMenu>
          </ButtonDropdown>          
      </FormGroup>
    );
  }

  disabledDropDown() {
    const field = 'isDisabled';
    const active = 'ACTIVE';
    const disabled = 'INACTIVE';
    const text = this.state.booking.isDisabled ? disabled : active;
    
    const opts = [
      {state: false, text: active},
      {state: true, text: disabled},
    ].map(m => (<DropdownItem key={m.text} onClick={(e) => this.ddOnSelect(field, m.state, e)}>{m.text}</DropdownItem>));
    
    return (
      <FormGroup>
          {this.renderLabel(field, field)} <br />
          <ButtonDropdown isOpen={this.state.dropdownsOpen[field]} toggle={(e) => this.toggleDropDown(field, e)}>            
            <DropdownToggle caret size="sm">{text}</DropdownToggle>
            <DropdownMenu>
              {opts}
            </DropdownMenu>
          </ButtonDropdown>          
      </FormGroup>
    );
  }

  submit(evt) {
    evt.preventDefault()
    this.setLoading(true);

    manageSvc.bookings.updateBooking(this.state.booking)
    .then(result => {
      this.setLoading(false);
      this.props.onSaved(this.state.booking);
    })
    .catch(e => {
      this.setLoading(false);
      this.props.onError();
      console.log(e)
    });
  }

  clearSearch() {
    this.refs.typeahead.getInstance().clear();
    this.state.booking.offer=null;
  }

  saveButton(isDisabled) {
    return isDisabled
      ? <Button color="primary" disabled>Save</Button> 
      : <Button color="primary" onClick={(e) => this.submit(e)}>Save</Button>;

  }

  setLoading(isLoading) {
    this.setState({isLoading: isLoading})
  }

  handleDateChange(date, field)
  {

    this.setState({
      booking: { ...this.state.booking, [field]: date },
      isTouched: { ...this.state.isTouched, [field]: true },
    });
  }

  renderDateFormGroup(field, time) {
    const placeholder = this.labels[field];
    return (
      <FormGroup>
        {this.renderLabel(field, field)}
        <DatePicker
                selected={moment(this.state.booking[field])}
                onChange={(e) => this.handleDateChange(e, field)}
                onBlur={() => this.handleBlur(field)}
                showTimeSelect
                timeFormat="HH:mm"
                dateFormat="LLL"
                timeCaption="time"
              />
      </FormGroup>
    );
  }

  handletypeHeadSelected(field, evt) {
    // evt is an array of objects
    this.setState({
      booking: {...this.state.booking, [field]: evt[0]},
    });
  }

  render() {
    this.errors = this.validate();
    const formIsDisabled = this.isFormInvalid();
    const loading = this.state.isLoading ? <Loading /> : '';
    return (
      <Row>
        {loading}
        <Col xs="12" md="6">
          <FormGroup>
          {this.renderLabel('car', 'car')}
          <Typeahead
                  ref="typeahead"
                  placeholder={this.state.booking.car.year+" "+
                    this.state.booking.car.make+" "+
                    this.state.booking.car.model}
                  onChange={(e) => this.handletypeHeadSelected('car', e)}
                  labelKey={option => `${option.year} ${option.make} ${option.model} ${option.rego}`}
                  options={this.props.cars}
                  filterBy={['rego']}
                />
          <Card>
              <CardHeader tag="h5">
                {this.state.booking.car.year} {this.state.booking.car.make}{" "}
                {this.state.booking.car.model} ({this.state.booking.car.colour}){" "}
              </CardHeader>
              <CardBody>
                <CardText>
                  
                  Doors: {this.state.booking.car.doors}<br />
                  Seats: {this.state.booking.car.seats}<br />

                  Registration: {this.state.booking.car.rego}
                </CardText>
              </CardBody>
            </Card>
            </FormGroup>
            {this.disabledDropDown()}
            {this.renderTextFormGroup('totalCost')}
        </Col>
        <Col xs="12" md="6">
          <FormGroup>
          {this.renderLabel('user', 'user')}
          <Typeahead
                  ref="typeahead"
                  placeholder={this.state.booking.user.email}
                  onChange={(e) => this.handletypeHeadSelected('user', e)}
                  labelKey={option => `${option.email} - ${option.mobile}`}
                  options={this.props.users}
                  filterBy={['email']}
                />
          </FormGroup>
          {this.renderTextFormGroup('unlockCode')}
          {this.renderLabel('offer', 'offer')}
          <FormGroup>
          <div className="input-group">
            <div className={stylesMain.flex1}>
            <Typeahead
                  ref="typeahead"
                  placeholder={this.state.placeholderOffer}
                  onChange={(e) => this.handletypeHeadSelected('offer', e)}
                  labelKey={option => `${option.offerCode} - ${option.oneOffValue}$ off - ${option.multiplier}% off`}
                  options={this.props.offers}
                  filterBy={['expiresAt']}
                />
            </div>
            <div className="input-group-append">
                <Button className="btn btn-outline-secondary" type="button" onClick={(e) => this.clearSearch()}>Clear</Button>
            </div>
          </div>
          </FormGroup>       

          {this.renderDateFormGroup('startsAt',this.props.booking.startsAt)}
          {this.renderDateFormGroup('endsAt',this.props.booking.endsAt)}


          {this.saveButton(formIsDisabled)}
        </Col>
      </Row>
    );
  }
}

BookingAdm.propTypes = {
  booking: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  cars: PropTypes.array.isRequired,
  offers: PropTypes.array.isRequired,
  onSaved: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

export default BookingAdm;