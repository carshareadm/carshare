//Import react
import React, { Component, PropTypes } from 'react'; 
import { Link } from 'react-router';
import {
  Button,
  FormGroup,
  Label,
  Input,
	FormText,
	Card,
	CardBody,
	CardHeader,
	CardText,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
	DropdownItem,
  Container,
  Row,
  Col,
} from "reactstrap";
import * as http from "../../util/http";

import DatePicker from 'react-datepicker';

import moment from 'moment';

import styles from './Manage.css'
import Cars from '../Locations/components/Cars/Cars';

//Manage component class
export class Manage extends Component {

	constructor(props){
		super(props);
		this.state = {
			loggedIn: false,
			isAdm: false,
		  };
	
	}
	componentDidMount() {
		if(window.localStorage.getItem('JWT'))
		this.setState({	loggedIn:true });
		this.state.isAdm=JSON.parse(atob(window.localStorage.getItem('JWT').split('.')[1]))['isAdmin'];
	}	

  	render() {
		return this.state.isAdm ? this.ManageFrm() : this.register();
	  }
	register()
	{
		return(
		<div className={styles.body}>
				<h1 className={styles.title}>Insufficient Access</h1>
				<p><Link to="/">Redirecting to previous page</Link><br /></p>
		</div>);
	}
	
	ManageFrm()
	{
	    // Here goes our page 
	  return (
	  <div className={styles.body}>
		<Container>
		<Row>
			<Col>
	        <h1 className={styles.title}>Management Console</h1>
			</Col>
		</Row>
		<Row>
				<Col xs="12" sm="6">
					<Card key="manage_Users">
          <CardHeader tag="h5">
            Manage Users<br/>
          </CardHeader>
          <CardBody>
            <div className="float-right">
            <Link to={"/profile"}>
              <Button className={styles.buttons} color="primary" size="lg">Manage Users</Button>
            </Link>
            </div>
            <CardText>
              Edit user profile & payment details
            </CardText>
          </CardBody>
        	</Card>
				</Col>
				<Col xs="12" sm="6">
					<Card key="manage_Locations">
          <CardHeader tag="h5">
            Manage Locations<br/>
          </CardHeader>
          <CardBody>
            <div className="float-right">
            <Link to={"/locations"}>
              <Button className={styles.buttons} color="primary" size="lg">Manage Locations</Button>
            </Link>
            </div>
            <CardText>
             Edit location information
            </CardText>
          </CardBody>
        	</Card>
				</Col>
				<br/>
		</Row>
		<Row>
		<Col xs="12" sm="6">
					<Card key="manage_Vehicles">
          <CardHeader tag="h5">
            Manage Vehicles<br/>
          </CardHeader>
          <CardBody>
            <div className="float-right">
            <Link to={"/cars"}>
              <Button className={styles.buttons} color="primary" size="lg">Manage Vehicles</Button>
            </Link>
            </div>
            <CardText>
             Edit vehicle information
            </CardText>
          </CardBody>
        	</Card>
				</Col>
				<Col xs="12" sm="6">
					<Card key="manage_Bookings">
          <CardHeader tag="h5">
            Manage Bookings<br/>
          </CardHeader>
          <CardBody>
            <div className="float-right">
            <Link to={"/booking?carid=temp"}>
              <Button className={styles.buttons} color="primary" size="lg">Manage Bookings</Button>
            </Link>
            </div>
            <CardText>
             Edit location information
            </CardText>
          </CardBody>
        	</Card>
				</Col>
		</Row>
		</Container>
	    </div>
	    );
  }
}

export default Manage;