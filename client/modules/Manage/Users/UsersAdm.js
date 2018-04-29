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
    };
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers() {
    manageSvc.users.getAll()
      .then(res => this.setState({users: res.data}))
      .catch(e => console.log(e));
  }

  handleUserSelected(evt) {
    // evt is an array of objects
    this.setState({selectedUser: evt[0]});
  }

  handleSaved(saveUser) {
    this.getUsers();
  }

  selectedUserForm() {
    return (
      !this.state.selectedUser 
      ? '' 
      : <UserAdm
          onSaved={this.handleSaved.bind(this)}
          user={this.state.selectedUser} />
    );
  }

  clearSearch() {
    this.refs.typeahead.getInstance().clear();
    this.setState({selectedUser: null});
  }

  render() {
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
                labelKey={option => `${option.name}`}
                options={this.state.users}
                filterBy={['name']}
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