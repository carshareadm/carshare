//Import react
import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import {
  Form,
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
  Table,
  Col,
} from "reactstrap";
import * as http from "../../../util/http";
import moment from "moment";

import stylesMain from "../../../main.css";
import styles from "./TimeTable.css";

//
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const hours = [
  "00:00",
  "01:00",
  "02:00",
  "03:00",
  "04:00",
  "05:00",
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
];

//Cars component class
export class TimeTable extends Component {
  sun = moment().startOf("week");
  mon = moment()
    .startOf("week")
    .add(1, "d");
  tue = moment()
    .startOf("week")
    .add(2, "d");
  wed = moment()
    .startOf("week")
    .add(3, "d");
  thu = moment()
    .startOf("week")
    .add(4, "d");
  fri = moment()
    .startOf("week")
    .add(5, "d");
  sat = moment()
    .startOf("week")
	.add(6, "d");
  selected= moment()
  .startOf("hour")
  .add(1, "hours");
	

  constructor(props) {
    super(props);
    this.weekBackward = this.weekBackward.bind(this);
    this.weekForward = this.weekForward.bind(this);
    this.state = {
      times: [],
      time: moment().startOf("week"),
      days: [
        this.sun,
        this.mon,
        this.tue,
        this.wed,
        this.thu,
        this.fri,
        this.sat,
      ],
    };
  }

  componentDidMount() {
    this.loadData(this.state.time);
    this.props.onRef(this);
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  loadData(time) {
    http
      .client()
      .get(`/cars/${this.props.data._id}/times?start=${time.toISOString()}`)
      .then(res => {
        this.setState({
          times: res.data,
        });
      });
  }

  /*
  Attempt at callback function
  Appears to be called but can not change value
  */

  onItemClickHandler(itemName) {
	this.props.func(itemName);
  }

  renderHour(h) {
    return (
      <tr key={h}>
        <th scope="row">{h}</th>
        {this.state.days.map(d => {
    var clickHandler = (event => {
          this.onItemClickHandler(moment(d).add(h.substring(0,2),'h'));
      });
   return (
         <td key={d + h}>
             {this.checkBooking(moment(d).format("ddd"), h) ? " " : 
              <Button onClick={clickHandler} data={moment(d).add(h.substring(0,2),'h')}>✓</Button>}
         </td>
       );
	 }
)}
      </tr>
    );
  }

  checkBooking(d, h) {
    return this.state.times.find(t => {
      return t.hour === h && t.weekday === d;
    });
  }

  weekBackward() {
    const newTime = this.state.time.subtract(1, "weeks");
    this.sun = this.sun.subtract(1, "weeks");
    this.mon = this.mon.subtract(1, "weeks");
    this.tue = this.tue.subtract(1, "weeks");
    this.wed = this.wed.subtract(1, "weeks");
    this.thu = this.thu.subtract(1, "weeks");
    this.fri = this.fri.subtract(1, "weeks");
    this.sat = this.sat.subtract(1, "weeks");
    this.setState({
      time: newTime,
    });
    this.time = this.state.time;
    this.loadData(newTime);
  }

  weekForward() {
    const newTime = this.state.time.add(1, "weeks");
    this.sun = this.sun.add(1, "weeks");
    this.mon = this.mon.add(1, "weeks");
    this.tue = this.tue.add(1, "weeks");
    this.wed = this.wed.add(1, "weeks");
    this.thu = this.thu.add(1, "weeks");
    this.fri = this.fri.add(1, "weeks");
    this.sat = this.sat.add(1, "weeks");
    this.setState({
      time: newTime,
    });
    this.time = this.state.time;
    this.loadData(newTime);
  }

  render() {
    return (
      <div className={styles.tableContainer}>
        <h3>Vehicle availability</h3>
        <div className={styles.weekBlock}>
          <Button
            color="primary"
            className={styles.buttonL}
            onClick={this.weekBackward}
          >
            {" "}
            &larr;{" "}
          </Button>
          Week Commencing {this.state.time.format("MMMM Do YYYY")}
          <Button
            color="primary"
            className={styles.buttonR}
            onClick={this.weekForward}
          >
            {" "}
            &rarr;{" "}
          </Button>
        </div>
        <Table>
          <thead>
            <tr>
              <th> </th>
              <th>S</th>
              <th>M</th>
              <th>T</th>
              <th>W</th>
              <th>T</th>
              <th>F</th>
              <th>S</th>
            </tr>
          </thead>
          <tbody>{hours.map(h => this.renderHour(h))}</tbody>
        </Table>
      </div>
    );
  }
}

export default TimeTable;
