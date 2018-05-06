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
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import {Typeahead} from 'react-bootstrap-typeahead';
import UserAdm from './components/UserAdm';

import manageSvc from "../../../services/manage.service";
import stylesMain from '../../../main.css';

export class UsersAdm extends Component {
  ALL_USERS = "All Users";
  APPROVED_USERS = "Users with APPROVED licenses";
  PENDING_USERS = "Users with PENDING licenses";

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      selectedUser: null,
      filter: this.ALL_USERS,
      dropdownsOpen: {
        filter: false,
      },
    };
  }

  componentDidMount() {
    this.getUsers();
  }

  async getUsers () {
    try {
      const res = await manageSvc.users.getAll();
      let tmp = null;
      const approved = res.data.filter(f => f.license.approvedByAdmin === true);
      const pending = res.data.filter(f => f.license.approvedByAdmin === false);
      console.log('bar')
      if (this.state.selectedUser) {
        console.log('foo')
        tmp = res.data.find(f => f._id === this.state.selectedUser._id);
      }
      console.log('baz')
      await this.setState({
        users: res.data,
        approved: approved,
        pending: pending,
        selectedUser: tmp,
      });
      console.log(self.state)
    }
    catch(e) {
      console.log(e)
    }
  }

  handleSelected(evt) {
    // evt is an array of objects
    this.setState({selectedUser: evt[0]});
  }

  handleSaved(savedUser) {
    this.getUsers();
  }

  selectedForm() {
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

  toggle(e) {
    const val = !this.state.dropdownsOpen.filter;
    this.setState({
      dropdownsOpen: { filter: val },
    })
  }

  ddOnSelect(value, evt) {
    this.setState({
      filter: value,
    });
  }

  renderUserFilterDropdown() {
    const field = 'filter';
    const active = 'ACTIVE';
    const disabled = 'INACTIVE';
    const text = this.state.filter;
    
    const opts = [
      this.ALL_USERS,
      this.APPROVED_USERS,
      this.PENDING_USERS,
    ].map(m => (<DropdownItem key={m} onClick={(e) => this.ddOnSelect(m, e)}>{m}</DropdownItem>));
    
    return (
      <FormGroup>
          <label>Filter by: </label><br />
          <ButtonDropdown isOpen={this.state.dropdownsOpen[field]} toggle={(e) => this.toggle(e)}>            
            <DropdownToggle caret size="sm">{text}</DropdownToggle>
            <DropdownMenu>
              {opts}
            </DropdownMenu>
          </ButtonDropdown>          
      </FormGroup>
    );
  }

  render() {
    const users = this.state.filter === this.ALL_USERS
    ? this.state.users
    : this.state.filter === this.APPROVED_USERS
    ? this.state.approved
    : this.state.pending;

    return (
      <div className={stylesMain.body}>
        <Row>
          <Col lg="12">
            <h1 className={stylesMain.title}>Manage Users</h1>
          </Col>
          <Col lg="12">
              <p>You can manage users with Approved and Pending licences. Select users for approval. To ban a user set its status to inactive</p>
          </Col>
        </Row>
        <Row>
          <Col>
          {this.renderUserFilterDropdown()}
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="input-group">
              <div className={stylesMain.flex1}>
                <Typeahead
                  ref="typeahead"
                  placeholder="Search for user..."
                  onChange={(e) => this.handleSelected(e)}
                  labelKey={option => `${option.email} - ${option.mobile}`}
                  options={users}
                  filterBy={['email', 'mobile']}
                />
              </div>
              <div className="input-group-append">
                <Button className="btn btn-outline-secondary" type="button" onClick={(e) => this.clearSearch()}>Clear</Button>
              </div>
            </div>
            <hr />
          </Col>
        </Row>
        {this.selectedForm()}
      </div>
    );
  }
}

export default UsersAdm;