//Import react
import React, { Component, PropTypes } from 'react'; 
import { Link } from 'react-router';
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
  Table,
  Col,
} from "reactstrap";
import * as http from "../../../util/http";
import moment from 'moment';

import stylesMain from '../../../main.css';
import styles from './TimeTable.css'


const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const hours = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
'13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']


//Cars component class
export class TimeTable extends Component {

	constructor(props){
		super(props);
		this.weekBackward = this.weekBackward.bind(this);
		this.weekForward = this.weekForward.bind(this);
		this.state = {
			times:[],
			time:moment().startOf('week'),
		}
	}

	componentDidMount(){
		this.loadData(this.state.time);
	}
	
	loadData(time){
		http.client().get(`/cars/${this.props.data._id}/times?start=${time.toISOString()}`).then(res => {
			this.setState({
				times: res.data,
			})
		})
	}

	renderHour(h){
		return(
			<tr key={h}>
				<th scope="row">{h}</th>
				{days.map(d => <td key={d+h}>{this.checkBooking(d, h) ?  " " : "✓"}</td>)}
			</tr>
		)
	}

	checkBooking(d, h){
		return this.state.times.find(t => {
			return t.hour===h && t.weekday===d
		});
	}

	weekBackward(){
		const newTime = this.state.time.subtract(1,"weeks");
		this.setState({
			time: newTime
		});
		this.loadData(newTime);
	}

	weekForward(){
		const newTime = this.state.time.add(1,"weeks");
		this.setState({
			time: newTime
		});
		this.loadData(newTime);
	}

	render(){
		return(
			<div className={styles.tableContainer}>	
				<h3>Vehicle availability</h3>
				<div className={styles.weekBlock}>
					<Button color="primary" className={styles.buttonL} onClick={this.weekBackward}> &larr; </Button>
					Week Commencing {this.state.time.format('MMMM Do YYYY')}
					<Button color="primary" className={styles.buttonR} onClick={this.weekForward}> &rarr; </Button>
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
					<tbody>
						{hours.map(h => this.renderHour(h))}
					</tbody>
				</Table>
			</div>
		)
	}
}

export default TimeTable;