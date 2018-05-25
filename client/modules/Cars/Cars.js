/**
 * Project       - ShaCar
 * Team          - Group 3 Carshare
 * Last Modified - 2018/05/25
 * Authors
 *               - Paul Crow
 *               - Inga Pflaumer
 *               - Tianqi Chen
 */
//Import react
import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import {
  Button,
  FormGroup,
  Label,
  Input,
  FormText,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  Row,
  Col,
} from "reactstrap";
import * as http from "../../util/http";

import styles from "./Cars.css";
import stylesMain from "../../main.css";

import Car from "./components/Car";

//Cars component class
export class Cars extends Component {
  constructor(props) {
    super(props);
    this.setType = this.setType.bind(this);
    this.state = {
      vType: "small",
      cars: [],
    };
    this.setCars("small");
  }

  setCars(type) {
    http
      .client()
      .get(`/cars/types/${type}`)
      .then(res => {
        //Select cars based on location
        this.setState({
          cars: res.data,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  setType(event) {
    const type = event.target.dataset.type;
    this.setState({
      vType: type,
      cars: [],
    });
    this.setCars(type);
  }

  buttonStyle(type) {
    return type === this.state.vType ? styles.active : null;
  }

  render() {
    return (
      <div className={stylesMain.body}>
        <Container>
          <Row>
            <Col>
              <h1 className={stylesMain.title}>Cars</h1>
              <h4 className={stylesMain.h4}>Select the vehicle type</h4>
            </Col>
          </Row>

          <div className="row no-gutters d-none d-md-flex">
            <Button
              className={
                stylesMain.buttons +
                " " +
                styles.button +
                " " +
                this.buttonStyle("small")
              }
              color="primary"
              size="lg"
              data-type="small"
              onClick={this.setType}
            >
              Small Vehicle
            </Button>
            <Button
              className={
                stylesMain.buttons +
                " " +
                styles.button +
                " " +
                this.buttonStyle("sports")
              }
              color="primary"
              size="lg"
              data-type="sports"
              onClick={this.setType}
            >
              Sports Vehicle
            </Button>
            <Button
              className={
                stylesMain.buttons +
                " " +
                styles.button +
                " " +
                this.buttonStyle("luxury")
              }
              color="primary"
              size="lg"
              data-type="luxury"
              onClick={this.setType}
            >
              Luxury Vehicle
            </Button>
            <Button
              className={
                stylesMain.buttons +
                " " +
                styles.button +
                " " +
                this.buttonStyle("suv")
              }
              color="primary"
              size="lg"
              data-type="suv"
              onClick={this.setType}
            >
              SUV Vehicle
            </Button>
          </div>

          <div className="row no-gutters d-xs-block d-md-none">
            <Button
              className={
                stylesMain.buttons +
                " " +
                styles.button +
                " " +
                this.buttonStyle("small")
              }
              color="primary"
              size="lg"
              data-type="small"
              onClick={this.setType}
            >
              Small Vehicle
            </Button>
            <Button
              className={
                stylesMain.buttons +
                " " +
                styles.button +
                " " +
                this.buttonStyle("sports")
              }
              color="primary"
              size="lg"
              data-type="sports"
              onClick={this.setType}
            >
              Sports Vehicle
            </Button>
            <Button
              className={
                stylesMain.buttons +
                " " +
                styles.button +
                " " +
                this.buttonStyle("luxury")
              }
              color="primary"
              size="lg"
              data-type="luxury"
              onClick={this.setType}
            >
              Luxury Vehicle
            </Button>
            <Button
              className={
                stylesMain.buttons +
                " " +
                styles.button +
                " " +
                this.buttonStyle("suv")
              }
              color="primary"
              size="lg"
              data-type="suv"
              onClick={this.setType}
            >
              SUV Vehicle
            </Button>
          </div>

          <Row className={styles.carsList}>
            {this.state.cars.map(c => <Car key={c._id} data={c} />)}
          </Row>
        </Container>
      </div>
    );
  }
}

export default Cars;
