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
  Alert,
} from "reactstrap";
import {Typeahead} from 'react-bootstrap-typeahead';
import BookingAdm from './components/BookingAdm';

import moment from "moment";

import manageSvc from "../../../services/manage.service";
import stylesMain from '../../../main.css';

export class BookingsAdm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bookings: [],
      users: [],
      cars: [],
      offers: [],
      selectedBooking: null,
      savedAlertOpen: false,
      errorAlertOpen: false,
      filter: this.ALL_USERS,
      dropdownsOpen: {
        filter: false,
      },
    };
  }

  componentDidMount() {
    this.getBookings();
    this.getUsers();
    this.getCars();
    this.getOffers();
  }

  getBookings() {
    manageSvc.bookings.getAll()
      .then(res => {
        let tmp = null;
        if (this.state.selectedBooking) {
          tmp = res.data.find(f => f._id === this.state.selectedBooking._id);          
        }
        this.setState({
          bookings: res.data,
          selectedBooking: tmp,
        });
      })
      .catch(e => console.log(e));
  }

  getUsers() {
    manageSvc.users.getAll()
      .then(res => this.setState({users: res.data}))
      .catch(e => console.log(e));
  }

  getCars() {
    manageSvc.cars.getAll()
      .then(res => this.setState({cars: res.data}))
      .catch(e => console.log(e));
  }

  getOffers() {
    manageSvc.offers.getAll()
      .then(res => this.setState({offers: res.data}))
      .catch(e => console.log(e));
  }

  handleBookingSelected(evt) {
    // evt is an array of objects
    this.setState({selectedBooking: evt[0]});
  }

  handleSaved(savedOffer) {
    this.getBookings();
    //Dismiss any previous error
    this.dismissError();
    this.setState({ savedAlertOpen: true });
  }

  handleError() {
    this.getBookings();
    //Dismiss any previous success
    this.dismissSuccess();
    this.clearSearch();
    this.setState({ errorAlertOpen: true });
  }

  selectedBookingForm() {
    return (
      !this.state.selectedBooking 
      ? '' 
      : <BookingAdm
          onSaved={this.handleSaved.bind(this)}
          onError={this.handleError.bind(this)}
          booking={this.state.selectedBooking}
          cars={this.state.cars}
          users={this.state.users}
          offers={this.state.offers}/>
    );
  }

  toggle(e) {
    const val = !this.state.dropdownsOpen.filter;
    this.setState({
      dropdownsOpen: { filter: val },
    })
  }

  clearSearch() {
    this.refs.typeahead.getInstance().clear();
    this.setState({selectedBooking: null});
    // Close any opened alert when selection is cleared
    this.dismissError();
    this.dismissSuccess();
  }

  dismissSuccess() {
    this.setState({ savedAlertOpen: false });
  }

  dismissError() {
    this.setState({ errorAlertOpen: false });
  }

  render() {

    return (
      <div className={stylesMain.body}>
        <Row>
          <Col lg="12">
            <h1 className={stylesMain.title}>Manage Bookings</h1>
          </Col>
          <Col lg="12">
            <p>After you select a booking, you will be able to edit its times, access code or make it inactive</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="input-group">
              <div className={stylesMain.flex1}>
                <Typeahead
                  ref="typeahead"
                  placeholder="Search for booking..."
                  onChange={(e) => this.handleBookingSelected(e)}
                  labelKey={option => `${option.car.make} ${option.car.model} ${option.car.rego} - starting : ${moment(
                    option.startsAt
                  ).format("MMMM Do YYYY HH:mm")}`}
                  options={this.state.bookings}
                  filterBy={['startsAt']}
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
            <Alert
              color="success"
              isOpen={this.state.savedAlertOpen}
              toggle={this.dismissSuccess.bind(this)}
            >
              Thank you, your changes were updated successfully.
            </Alert>
            <Alert
              color="danger"
              isOpen={this.state.errorAlertOpen}
              toggle={this.dismissError.bind(this)}
            >
              Sorry, there was an error. Please retry.
            </Alert>
          </Col>
        </Row>
        {this.selectedBookingForm()}
      </div>
    );
  }
}

export default BookingsAdm;