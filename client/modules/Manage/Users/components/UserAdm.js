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

import Loading from '../../../Loading/Loading';
import * as manageSvc from "../../../../services/manage.service";
import stylesMain from '../../../../main.css';

export class UserAdm extends Component {

  yearOptions = [];

  seatsOptions = [2, 3, 4, 5, 6, 7, 8];
  doorsOptions = [2, 3, 4, 5];

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      location: {...this.props.location},
      isTouched: {
        name: false,
        isDisabled: false,
        latitude: false,
        longitude: false,
      },
      dropdownsOpen: {
        isDisabled: false,
      },
    }


    const minYear = 2000;
    const maxYear = (new Date()).getFullYear();
    for(var i = minYear; i < maxYear; i++) {
      this.yearOptions.push(i);
    }
  }
  
  labels = {
    name: 'Name',
    latitude: 'Latitude',
    longitude: 'Longitude',
    isDisabled: 'Active State',
  };

  errors = {};

  errorMsgs = {
    name: 'is required',
    latitude: 'must be between -90 and 90',
    longitude: 'must be between -180 and 180',
  };

  isLatitudeInvalid(lat) {
    return isNaN(lat) || +lat < -90 || +lat > 90;
  }
  
  isLongitudeInvalid(lng) {
    return isNaN(lng) || +lng < -180 || +lng > 180;
  }

  validate() {
    const errs = {
      name: this.state.location.name.length < 1,
      latitude: this.isLatitudeInvalid(this.state.location.coordinates.latitude),
      longitude: this.isLongitudeInvalid(this.state.location.coordinates.longitude),
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

  handleInputChange(field, isCoord, evt)
  {
    let value = evt.target.value;
    let loc = {...this.state.location};
    if (isCoord) {
      loc = {...loc, coordinates: { [field]: value }};
    } else {
      loc = {...loc, [field]: value };
    }

    this.setState({
      location: loc,
      isTouched: { ...this.state.isTouched, [field]: true },
    });
  }

  renderTextFormGroup(field, isCoord) {
    const placeholder = this.labels[field];
    const value = isCoord ? this.state.location.coordinates[field] : this.state.location[field];
    return (
      <FormGroup>
        {this.renderLabel(field, field)}
        <Input
          type="text"
          name={field}
          id={field}
          placeholder={placeholder}
          className={this.isError(field) ? 'is-invalid' : ''}
          onChange={(e) => this.handleInputChange(field, isCoord, e)}
          onBlur={() => this.handleBlur(field)}
          value={value}
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
      location: {...this.state.location, [field]: value},
      isTouched: {...this.state.isTouched, [field]: true},
      dropdownsOpen: {...this.state.dropdownsOpen, [field]: false},
    });
  }

  disabledDropDown() {
    const field = 'isDisabled';
    const active = 'ACTIVE';
    const disabled = 'INACTIVE';
    const text = this.state.location.isDisabled ? disabled : active;
    
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

    manageSvc.locations.updateLocation(this.state.location)
    .then(result => {
      this.setLoading(false);
      this.props.onSaved(this.state.location);
    })
    .catch(e => {
      this.setLoading(false);
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
          
          <h5>Google Maps goes here</h5>

        </Col>
        <Col xs="12" md="6">
          {this.disabledDropDown()}
          {this.renderTextFormGroup('name', false)}
          {this.renderTextFormGroup('latitude', true)}
          {this.renderTextFormGroup('longitude', true)}
          
          {this.saveButton(formIsDisabled)}
        </Col>
      </Row>
    );
  }
}

export default UserAdm;