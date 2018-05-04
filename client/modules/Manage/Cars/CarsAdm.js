import React, { Component, PropTypes } from "react";
import {
  Button,
  Row,
  Col,
  ButtonGroup,
  FormGroup,
  Input,
  Label,
  Form,
} from "reactstrap";
import {Typeahead} from 'react-bootstrap-typeahead';
import CarAdm from './components/CarAdm';

import manageSvc from "../../../services/manage.service";
import stylesMain from '../../../main.css';

export class CarsAdm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cars: [],
      selectedCar: null,
      locations: [],
      vehicleTypes: [],
      isCreating: false,
    };
  }

  componentDidMount() {
    this.getCars();
    this.getLocations();
    this.getVehicleTypes();
  }

  getCars() {
    manageSvc.cars.getAll()
      .then(res => {
        let tmp = null;
        if (this.state.selectedCar) {
          tmp = res.data.find(f => f._id === this.state.selectedCar._id);          
        }
        this.setState({
          cars: res.data,
          selectedCar: tmp,
        });
      })
      .catch(e => console.log(e));
  }

  getLocations() {
    manageSvc.locations.getAll()
      .then(res => this.setState({locations: res.data}))
      .catch(e => console.log(e));
  }

  getVehicleTypes() {
    manageSvc.vehicleTypes.getAll()
      .then(res => this.setState({vehicleTypes: res.data}))
      .catch(e => console.log(e));
  }

  handleCarSelected(evt) {
    // evt is an array of objects
    this.setState({selectedCar: evt[0]});
  }

  async handleSaved(savedCar) {
    if (this.state.isCreating) {
      await this.isCreating(false);
      this.addSaved(savedCar);
    }
    this.getCars();
  }

  addSaved(savedCar) {
    const cars = [...this.state.cars];
    cars.push(savedCar);
    this.setState({
      ...this.state,
      cars: cars,
    })
  }

  selectedCarForm() {
    return (
      !this.state.selectedCar 
      ? '' 
      : <CarAdm
          onSaved={this.handleSaved.bind(this)}
          car={this.state.selectedCar}
          vehicleTypes={this.state.vehicleTypes}
          locations={this.state.locations}
          isCreating={this.state.isCreating} />
    );
  }

  clearSearch() {
    this.refs.typeahead.getInstance().clear();
    this.setState({selectedCar: null});
  }

  async isCreating(isCreating) {
    const newCar = {
      rego: '',
      make: '',
      model: '',
      colour: '',
      year: 2000,
      seats: 0,
      doors: 0,
      isDisabled: false,
      vehicleType: {},
      location: {},
      image: {},
    };

    if (isCreating && this.state.selectedCar) {
      await this.setState({
        ...this.state,
        selectedCar: null,
      });
    }

    this.setState({
      ...this.state,
      isCreating: isCreating,
      selectedCar: isCreating ? newCar : null,
    });
  }

  addOrCancelBtn() {
    return this.state.isCreating
    ? <Button
        className={stylesMain.addNewBtn}
        size="sm"
        color="link"
        onClick={(e) => this.isCreating(false)}>&times; Cancel</Button>
    : <Button
        className={stylesMain.addNewBtn}
        size="sm"
        color="link"
        onClick={(e) => this.isCreating(true)}>&#43; Add New</Button>
  }

  typeahead() {
    return this.state.isCreating
    ? ''
    : (
      <div className="input-group">
        <div className={stylesMain.flex1}>
          <Typeahead
            ref="typeahead"
            placeholder="Search for car..."
            onChange={(e) => this.handleCarSelected(e)}
            labelKey={option => `${option.make} ${option.model} ${option.rego}`}
            options={this.state.cars}
            filterBy={['make', 'model', 'rego']}
          />
        </div>
        <div className="input-group-append">
          <Button className="btn btn-outline-secondary" type="button" onClick={(e) => this.clearSearch()}>Clear</Button>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className={stylesMain.body}>
        <Row>
          <Col>
            <h1 className={stylesMain.title}>Manage Cars</h1>
            {this.addOrCancelBtn()}
            {this.typeahead()}
            <hr className={stylesMain.clearBoth} />
          </Col>
        </Row>
        {this.selectedCarForm()}
      </div>
    );
  }
}

export default CarsAdm;