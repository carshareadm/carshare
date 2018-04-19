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

import * as http from "../../../util/http";
import stylesMain from '../../../main.css';

export class LocationsAdm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={stylesMain.body}>
        <div className="row">
          <Col>
            <h1 className={stylesMain.title}>Manage Locations</h1>
          </Col>
        </div>
      </div>
    );
  }
}

export default LocationsAdm;