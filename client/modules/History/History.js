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
	Col,
} from "reactstrap";
import * as http from "../../util/http";

import styles from './History.css'
import stylesMain from '../../main.css'

import HistoryItem from './components/HistoryItem'

export class History extends Component {
	constructor(props){
		super(props);
		this.setBookings = this.setBookings.bind(this);
		this.state = {
			bookings:[]
		}
	}

	componentDidMount(){
		this.setBookings();
	}

	setBookings(){
			http
		      .client()
		      .get(`/profile/bookings`)
		      .then(res => {
		      	//save requested bookings to state
		        this.setState({ 
		          bookings: res.data, 
		        })
		      })
		      .catch(err => {
		        console.log(err);
		      });
	}

	render() {
		return (
			<div className={stylesMain.body}>
				<Container>
					<Row>
						{this.state.bookings.map(b => <HistoryItem key={b._id} data={b} />)}
					</Row>
				</Container>
			</div>
		)
	}

}

export default History;