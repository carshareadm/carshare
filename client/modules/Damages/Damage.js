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

import DamageItem from './components/DamageItem'
import stylesMain from '../../main.css'

export class Damage extends Component {

	constructor(props){
		super(props);
		this.getDamages = this.getDamages.bind(this);
		this.state = {
			damages:[],
		}
	}

	componentDidMount(){
		this.getDamages();
	}

	getDamages(){
		http
		    .client()
		    .get(`/damage/${this.props.params.carId}/showDamage`)
		    .then(res => {
		        this.setState({ 
		          damages: res.data, 
		        })
		    })
		    .catch(err => {
		        console.log(err);
		    });
	}

	render(){
		return (
			<div className={stylesMain.body}>
				<Container>
					<Row>
						<Col>
							<h3>Damages reported for this car</h3>
						</Col>
					</Row>
						{this.state.damages.map(b => <DamageItem key={b._id} data={b} />)}
					<Row>
						<Col>
						    <Link to={`/history`}>
             					<Button className={stylesMain.buttons} size="lg">Back to your Bookings</Button>
             				</Link>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}


export default Damage;