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
import UserAdm from './components/UserAdm';

import manageSvc from "../../../services/manage.service";
import stylesMain from '../../../main.css';

export class UsersAdm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      selectedUser: null,
      locations: [],
      vehicleTypes: [],
    };
  }

  componentDidMount() {
    this.getUsers();
    this.getLocations();
    this.getVehicleTypes();
  }

  getUsers() {
    manageSvc.users.getAll()
      .then(res => {
        let tmp = null;
        if (this.state.selectedUser) {
          tmp = res.data.find(f => f._id === this.state.selectedUser._id);          
        }
        this.setState({
          users: res.data,
          selectedUser: tmp,
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

  handleUserSelected(evt) {
    // evt is an array of objects
    this.setState({selectedUser: evt[0]});
  }

  handleSaved(savedUser) {
    this.getUsers();
  }

  selectedUserForm() {
    return (
      !this.state.selectedUser 
      ? '' 
      : <UserAdm
          onSaved={this.handleSaved.bind(this)}
          user={this.state.selectedUser}
          vehicleTypes={this.state.vehicleTypes}
          locations={this.state.locations}/>
    );
  }

  clearSearch() {
    this.refs.typeahead.getInstance().clear();
    this.setState({selectedUser: null});
  }

  render() {
    const c = this.state.users.map(c => (<li>{c.make}</li>))
    return (
      <div className={stylesMain.body}>
        <Row>
          <Col>
            <h1 className={stylesMain.title}>Manage Users</h1>
            <div className="input-group">
              <Typeahead
                ref="typeahead"
                align="left"
                placeholder="Search for user..."
                onChange={(e) => this.handleUserSelected(e)}
                labelKey={option => `${option.email}`}
                options={this.state.users}
                
              />              
              <div className="input-group-append">
                <Button className="btn btn-outline-secondary" type="button" onClick={(e) => this.clearSearch()}>Clear</Button>
              </div>
            </div>
            <hr />
          </Col>
        </Row>
        {this.selectedUserForm()}
      </div>
    );
  }
}

export default UsersAdm;