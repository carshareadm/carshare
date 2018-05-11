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
import DamageItem from "../../Damages/components/DamageItem.js"

import manageSvc from "../../../services/manage.service";
import stylesMain from '../../../main.css';

export class DamagesAdm extends Component {
  constructor(props) {
    super(props);
    this.clearDamage = this.clearDamage.bind(this);
    this.state = {
      damages: [],
      cars:[],
      selectedCar: null,
    };
  }

  componentDidMount() {
    this.getDamages(this.state.selectedCar);
    this.getCars();
  }

  getDamages(carid) {
    manageSvc.damages.getAll(carid)
      .then(res => this.setState({ damages: res.data }))
      .catch(e => console.log(e));
  }

  getCars() {
    manageSvc.cars.getAll()
      .then(res => this.setState({cars: res.data}))
      .catch(e => console.log(e));
  }


  clearSearch() {
    this.refs.typeahead.getInstance().clear();
    this.setState({selectedCar: null});
  }

  clearDamage(event){
    const id = event.target.dataset.id;
      manageSvc.damages.updateDamage(id)
      .then(res => this.getDamages())
      .catch(e => console.log(e));
  }

  handleCarSelected(selections){
    const selectedID = selections[0] ? selections[0]._id : null;
    this.setState({
      selectedCar: selectedID,
    });
    this.getDamages(selectedID)
  }

  render() {
    return (
      <div className={stylesMain.body}>
        <Row>
          <Col lg="12">
            <h1 className={stylesMain.title}>Manage Damages</h1>
          </Col>
          <Col lg="12">
            <p>Here you can resolve damages. Resolved damages are hidden from the user. If you want to manage damages on a specific car - select a car.</p>
          </Col>
          <Col lg="12">
            <div className="input-group">
              <div className={stylesMain.flex1}>
                <Typeahead
                  ref="typeahead"
                  placeholder="Search for car..."
                  onChange={(e) => this.handleCarSelected(e)}
                  labelKey={option => `${option.make} ${option.model}`}
                  options={this.state.cars}
                  filterBy={['make', 'model']}
                />
              </div>     
              <div className="input-group-append">
                <Button className="btn btn-outline-secondary" type="button" onClick={(e) => this.clearSearch()}>Clear</Button>
              </div>
            </div>
            <hr />
          </Col>
          </Row>
          <Row>
          <Col>
          {this.state.damages.map(b => <DamageItem key={b._id} data={b} button={b.isDisabled ? null : <Button data-id={b._id} onClick={this.clearDamage}>Resolve</Button>} />)}
          </Col>
        </Row>
      </div>
    );
  }
}

export default DamagesAdm;