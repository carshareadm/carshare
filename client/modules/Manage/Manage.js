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

import DatePicker from 'react-datepicker';

import moment from 'moment';

import styles from './Manage.css'
import Cars from '../Locations/components/Cars/Cars';

const storage = require('../../util/persistedStorage');

//Booking component class
export class Manage extends Component {

	constructor(props){
		super(props);
		this.state = {
			cars: [], 
      locations: [], 
			Rego: '',
			HireType: '',
			Address: '',
			selectedCar:false,
			loggedIn: false,
			booked: false,
		  };
	
	}
	componentDidMount() {
		if(storage.get(storage.Keys.JWT))
		this.setState({	loggedIn:true });
		http
      .client()
      .get("/cars")
      .then(res => {

        this.setState({ 
          cars: res.data,
          locations: res.data.map(car => car.location),
        })
      })
      .catch(err => {
        console.log(err);
      });
	}	

	sortCarsOnLoc(cars, lat, lng){
    return cars.slice(0).map(c => {
      c.distanceKM = distanceKM(
        c.location.coordinates.latitude, c.location.coordinates.longitude, lat, lng 
      ); 
      return c;
    }).sort((c1, c2) => (c1.distanceKM - c2.distanceKM));
  }
		
	handleSubmit(evt){
       if (this.isFormInvalid()) {
         evt.preventDefault();
         return;
       }
       else{
         evt.preventDefault();
         http.client().post('/booking/', {
           car: this.state.car_id,
         })
         .then(res => {
           console.log(res);
           this.setState({booked: true});
         })
         .catch(err => console.log(err));
       }
       //alert(`Signed up with email: ${email} password: ${password1} mobile: ${mobile} license: ${license}`);
	 }

  	render() {
		return this.state.booked ? this.booked() : (this.state.loggedIn ? this.bookingFrm() : this.register());
	  }
	register()
	{
		return(
		<div className={styles.body}>
				<h1 className={styles.title}>Please Register</h1>
				<p><Link to="/register">Click here to go to Register</Link><br /></p>
		</div>);
	}
	booked()
	{
		return(
		<div className={styles.body}>
				<h1 className={styles.title}>Booking success</h1>
				<p><Link to="/">Click here to return home</Link><br /></p>
		</div>);
	}
	
	bookingFrm()
	{
	    // Here goes our page 
	  return (
	  <div className={styles.body}>
		<Container>
		<Row>
			<Col>
	        <h1 className={styles.title}>Cars</h1>
			</Col>
		</Row>
            <form onSubmit={this.handleSubmit.bind(this)}>
		<Row>
					<Col>
					<Cars cars={this.state.cars} byType={true}/>
					</Col>
		</Row>
            </form>
		<Row>
			<Col>
			</Col>
		</Row>
		</Container>
	    </div>
	    );
  }
}

export default Manage;