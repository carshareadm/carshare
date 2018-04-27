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

  handleSaved(savedCar) {
    this.getCars();
  }

  selectedCarForm() {
    return (
      !this.state.selectedCar 
      ? '' 
      : <CarAdm
          onSaved={this.handleSaved.bind(this)}
          car={this.state.selectedCar}
          vehicleTypes={this.state.vehicleTypes}
          locations={this.state.locations}/>
    );
  }

  clearSearch() {
    this.refs.typeahead.getInstance().clear();
    this.setState({selectedCar: null});
  }

  render() {
    const c = this.state.cars.map(c => (<li>{c.make}</li>))
    return (
      <div className={stylesMain.body}>
        <Row>
          <Col>
            <h1 className={stylesMain.title}>Manage Cars</h1>
            <div className="input-group">
              <Typeahead
                ref="typeahead"
                align="left"
                placeholder="Search for car..."
                onChange={(e) => this.handleCarSelected(e)}
                labelKey={option => `${option.make} ${option.model} ${option.rego}`}
                options={this.state.cars}
                filterBy={['make', 'model', 'rego']}
              />              
              <div className="input-group-append">
                <Button className="btn btn-outline-secondary" type="button" onClick={(e) => this.clearSearch()}>Clear</Button>
              </div>
            </div>
            <hr />
          </Col>
        </Row>
        {this.selectedCarForm()}
      </div>
    );
  }
}

export default CarsAdm;