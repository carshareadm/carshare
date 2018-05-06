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
  Alert,
} from "reactstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import OfferAdm from "./components/OfferAdm";

import moment from "moment";

import manageSvc from "../../../services/manage.service";
import stylesMain from "../../../main.css";

export class OffersAdm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offers: [],
      selectedOffer: null,
      savedAlertOpen: false,
      errorAlertOpen: false,
    };
  }

  componentDidMount() {
    this.getOffers();

  }

  getOffers() {
    manageSvc.offers
      .getAll()
      .then(res => {
        let tmp = null;
        if (this.state.selectedOffer) {
          tmp = res.data.find(f => f._id === this.state.selectedOffer._id);
        }
        this.setState({
          offers: res.data,
          selectedOffer: tmp,
        });
      })
      .catch(e => console.log(e));
  }

  handleOfferSelected(evt) {
    // evt is an array of objects
    this.setState({ selectedOffer: evt[0] });
  }

  handleSaved(savedOffer) {
    this.getOffers();
    //Dismiss any previous error
    this.dismissError();
    this.setState({ savedAlertOpen: true });
  }

  handleError() {
    this.getOffers();
    //Dismiss any previous success
    this.dismissSuccess();
    this.clearSearch();
    this.setState({ errorAlertOpen: true });
  }

  selectedOfferForm() {
    return !this.state.selectedOffer ? (
      ""
    ) : (
      <OfferAdm
        onSaved={this.handleSaved.bind(this)}
        onError={this.handleError.bind(this)}
        offer={this.state.selectedOffer}
      />
    );
  }

  clearSearch() {
    this.refs.typeahead.getInstance().clear();
    this.setState({ selectedOffer: null });
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
            <h1 className={stylesMain.title}>Manage Offers</h1>
          </Col>
          <Col lg="12">
            <p>To manage offers select an offer and edit it. To hide an offer set its status to inactive</p>
          </Col>
          <Col lg="12">
            <div className="input-group">
              <div className={stylesMain.flex1}>
                <Typeahead
                  ref="typeahead"
                  placeholder="Search for offer..."
                  onChange={e => this.handleOfferSelected(e)}
                  labelKey={option =>
                    `${option.offerCode} - expiring : ${moment(
                      option.expiresAt
                    ).format("MMMM Do YYYY HH:mm")}`
                  }
                  options={this.state.offers}
                  filterBy={["offerCode"]}
                />
              </div>
              <div className="input-group-append">
                <Button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={e => this.clearSearch()}
                >
                  Clear
                </Button>
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
        {this.selectedOfferForm()}
      </div>
    );
  }
}

export default OffersAdm;
