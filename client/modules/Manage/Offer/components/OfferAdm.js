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
} from "reactstrap";

import DatePicker from "react-datepicker";

import moment from "moment";

import Loading from '../../../Loading/Loading';
import * as manageSvc from "../../../../services/manage.service";
import stylesMain from '../../../../main.css';

export class OfferAdm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      offer: {...this.props.offer},
      tmpDate: moment(),
      isTouched: {
        offerCode: false,
        oneOffValue: false,
        multiplier: false,
        expiresAt: false,
        isDisabled: false,
      },
      dropdownsOpen: {
        isDisabled: false,
      },
    }
  }
  
  labels = {
    offerCode: 'Offer Code',
    oneOffValue: '$ off',
    multiplier: '% Off',
    expiresAt: 'Expiry',
    isDisabled: 'Active State',
  };

  errors = {};

  errorMsgs = {
    offerCode: 'is required',
    oneOffValue: 'number only',
    multiplier: 'number only',
    expiresAt: '',
    isDisabled: '',
  };

  validate() {
    const errs = {
      
      offerCode: this.state.offer.offerCode.length < 1,

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
      offer: { ...this.state.offer, [field]: value },
      isTouched: { ...this.state.isTouched, [field]: true },
    });
  }

  handleDateChange(date)
  {
    //let field = evt.target.id;
    //let value = evt.target.value
    this.setState({ tmpDate: date });
    this.setState({
      offer: { ...this.state.offer, ['expiresAt']: date },
      isTouched: { ...this.state.isTouched, ['expiresAt']: true },
    });
  }

  componentDidMount() {

  }
  
  renderExpiryFormGroup(field) {
    const placeholder = this.labels[field];
    return (
      <FormGroup>
        {this.renderLabel(field, field)}
        <DatePicker
                selected={moment(this.state.offer[field])}
                onChange={this.handleDateChange.bind(this)}
                onBlur={() => this.handleBlur(field)}
                showTimeSelect
                timeFormat="HH:mm"
                dateFormat="LLL"
                timeCaption="time"
              />
      </FormGroup>
    );
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
          value={this.state.offer[field]}
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
      offer: {...this.state.offer, [field]: value},
      isTouched: {...this.state.isTouched, [field]: true},
      dropdownsOpen: {...this.state.dropdownsOpen, [field]: false},

    });
  }

  disabledDropDown() {
    const field = 'isDisabled';
    const active = 'ACTIVE';
    const disabled = 'INACTIVE';
    const text = this.state.offer.isDisabled ? disabled : active;
    
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

    manageSvc.offers.updateOffer(this.state.offer)
    .then(result => {
      this.setLoading(false);
      this.props.onSaved(this.state.offer);
    })
    .catch(e => {
      this.setLoading(false);
      this.props.onError();
      console.log(e)
    });
  }

  saveButton(isDisabled) {
    return isDisabled
      ? <Button color="primary" disabled>Save</Button> 
      : <Button color="primary" onClick={(e) => this.submit(e)}>Save</Button>;

  }

  setLoading(isLoading) {
    this.setState({isLoading: isLoading})
  }

  render() {
    this.errors = this.validate();
    const formIsDisabled = this.isFormInvalid();
    const loading = this.state.isLoading ? <Loading /> : '';
    return (
      <Row>
        {loading}
        <Col xs="12" md="6">
          {this.renderTextFormGroup('offerCode')}
          {this.disabledDropDown()}
          {this.renderExpiryFormGroup('expiresAt')}

        </Col>
        <Col xs="12" md="6">
          {this.renderTextFormGroup('oneOffValue')}
          {this.renderTextFormGroup('multiplier')}
          

          {this.saveButton(formIsDisabled)}
        </Col>
      </Row>
    );
  }
}

OfferAdm.propTypes = {
  offer: PropTypes.object.isRequired,
  onSaved: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

export default OfferAdm;