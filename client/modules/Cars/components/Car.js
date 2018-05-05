// Imports
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import carPlaceholder from '../carPlaceholder.png';


// reactstrapify
import {
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  CardText,
} from 'reactstrap';

import CarImage from '../../Manage/Cars/components/CarImage';
import stylesMain from '../../../main.css';
import styles from './Car.css'

// component class
class Car extends Component {
  image(car) {
    return car.image
    ? <CarImage imageUrl={car.image.publicUrl} />
    : <img className={styles.carImage} src={carPlaceholder} />;
  }

  render() {
    const car = this.props.data;
    return (
        <Col xs="12" sm="6">
          <CardHeader>
            {this.image(car)}
          </CardHeader>
          
          <div className={styles.separator}></div>

          <CardBody className={styles.carDescr}>
            <p>Vehicle - <span className={stylesMain.h4}>{car.make} {car.model}</span></p>
            <p>Hire Type - <span className={stylesMain.h4}>{car.vehicleType.name}</span></p>
            <p>Registration - <span className={stylesMain.h4}>{car.rego}</span></p>
            <p>Seats - <span className={stylesMain.h4}>{car.seats}</span></p>
            <p>Doors - <span className={stylesMain.h4}>{car.doors}</span></p>
            <p>Colour - <span className={stylesMain.h4}>{car.colour}</span></p>
            <br/>
            <p>Location - <span className={stylesMain.h4}>{car.location.name}</span></p>
            <br/>
            <p>$ <span className={stylesMain.h4}>{car.vehicleType.hourlyRate.toFixed(
                    2
                  )} per hour</span></p>
          </CardBody>
            <Link to={"/booking?carid="+car._id}>
              <Button className={stylesMain.buttons +" "+ styles.button}>Book</Button>
            
            </Link>
        </Col>
    );
  }
}

export default Car;

