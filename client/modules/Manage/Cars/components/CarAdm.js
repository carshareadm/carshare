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
import CarImage from './CarImage';
import FileUploader from '../../../FileUploader/FileUploader';
import * as manageSvc from "../../../../services/manage.service";
import stylesMain from '../../../../main.css';

export class CarAdm extends Component {

  yearOptions = [];

  seatsOptions = [2, 3, 4, 5, 6, 7, 8];
  doorsOptions = [2, 3, 4, 5];

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      car: {...this.props.car},
      carImage: this.props.car.image && this.props.car.image.publicUrl ? this.props.car.image.publicUrl : '',
      isTouched: {
        rego: false,
        make: false,
        model: false,
        year: false,
        isDisabled: false,
        colour: false,
        seats: false,
        doors: false,
        vehicleType: false,
        location: false,
      },
      dropdownsOpen: {
        isDisabled: false,
        year: false,
        seats: false,
        doors: false,
        location: false,
        vehicleType: false,
      },
    }


    const minYear = 2000;
    const maxYear = (new Date()).getFullYear();
    for(var i = minYear; i < maxYear; i++) {
      this.yearOptions.push(i);
    }
  }
  
  labels = {
    rego: 'Rego',
    make: 'Make',
    model: 'Model',
    year: 'Year',
    isDisabled: 'Active State',
    colour: 'Colour',
    seats: 'Seats',
    doors: 'Doors',
    vehicleType: 'Type',
    location: 'Location',
  };

  errors = {};

  errorMsgs = {
    rego: 'is required',
    make: 'is required',
    model: 'is required',
    year: 'is required',
    isDisabled: 'Active State',
    colour: 'is required',
    seats: 'is required',
    doors: 'is required',
    vehicleType: 'is required',
    location: 'is required',
  };

  validate() {
    const errs = {
      rego: this.state.car.rego.length < 1,
      make: this.state.car.make.length < 1,
      model: this.state.car.model.length < 1,
      year: this.state.car.year < this.minYear || this.state.year > this.maxYear,      
      colour: this.state.car.colour.length < 1,
      seats: this.state.car.seats < Math.min(...this.seatsOptions) || this.state.car.seats > Math.max(...this.seatsOptions),
      doors: this.state.car.doors < Math.min(...this.doorsOptions)|| this.state.car.doors > Math.max(...this.doorsOptions),
      vehicleType: this.state.car.vehicleType._id.length < 1,
      location: this.state.car.location._id.length < 1,
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
      car: { ...this.state.car, [field]: value },
      isTouched: { ...this.state.isTouched, [field]: true },
    });
  }

  componentDidMount() {

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
          value={this.state.car[field]}
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
      car: {...this.state.car, [field]: value},
      isTouched: {...this.state.isTouched, [field]: true},
      dropdownsOpen: {...this.state.dropdownsOpen, [field]: false},

    });
  }

  renderDropdownFormGroup(field, options) {

    const opts = options.map(m => (<DropdownItem key={m} onClick={(e) => this.ddOnSelect(field, m, e)}>{m}</DropdownItem>));
    const text = this.state.car[field];
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
    const text = this.state.car.isDisabled ? disabled : active;
    
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

  renderObjectDropDown(field, options) {
    const opts = options.map(m => (
        <DropdownItem key={m._id} onClick={(e) => this.ddOnSelect(field, m, e)}>{m.name}</DropdownItem>
      )
    );
    const text = this.state.car[field] ? this.state.car[field].name : `Select ${this.labels[field]}`;
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

    manageSvc.cars.updateCar(this.state.car)
    .then(result => {
      this.setLoading(false);
      this.props.onSaved(this.state.car);
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

  async onImageUploaded(evt) {
    try{
      const updated = await manageSvc.cars.updateCarImage(this.state.car, evt)
      console.log('post image updated', updated)
      await this.setState({
        ...this.state,
        carImage: updated.data.image.publicUrl,
      })
      this.props.onSaved();
    }
    catch(e) {
      console.log(e);
    }
  }

  render() {
    this.errors = this.validate();
    const formIsDisabled = this.isFormInvalid();
    const loading = this.state.isLoading ? <Loading /> : '';
    const imgUrl = this.state.carImage

    console.log(imgUrl)

    return (
      <Row>
        {loading}
        <Col xs="12" md="6">
          <CarImage key={imgUrl} imageUrl={imgUrl} />
          <FileUploader
            onFileUploaded={this.onImageUploaded.bind(this)}
            isPublic={true} />

        </Col>
        <Col xs="12" md="6">
          {this.disabledDropDown()}
          {this.renderTextFormGroup('rego')}
          {this.renderTextFormGroup('make')}
          {this.renderTextFormGroup('model')}
          {this.renderObjectDropDown('vehicleType', this.props.vehicleTypes)}
          {this.renderTextFormGroup('colour')}
          {this.renderDropdownFormGroup('year', this.yearOptions)}
          {this.renderDropdownFormGroup('seats', this.seatsOptions)}
          {this.renderDropdownFormGroup('doors', this.doorsOptions)}

          {this.renderObjectDropDown('location', this.props.locations)}

          {this.saveButton(formIsDisabled)}
        </Col>
      </Row>
    );
  }
}

CarAdm.propTypes = {
  car: PropTypes.object.isRequired,
  locations: PropTypes.array.isRequired,
  vehicleTypes: PropTypes.array.isRequired,
  onSaved: PropTypes.func.isRequired,
};

export default CarAdm;