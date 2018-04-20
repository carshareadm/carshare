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

import FileUploader from '../FileUploader/FileUploader';
import Loading from '../Loading/Loading';

import * as http from "../../util/http";
import * as validator from "validator";

import styles from './Damages.css'
import stylesMain from '../../main.css'

export class Damages extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
	      description: "",
	      image: "",
	      booking:{}
	    };
  	}

	valids = {};

  validate(){
    const valids = {
      description: this.state.message.length > 0,
    }
    return valids;
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.formIsValid()) {
      http
        .client()
        //How to get booking ID from url to give it to the controller?
        .post(`/${booking}/createDamage`, {
          description:this.state.description
        })
	    .then(res => {
	        console.log(res);
	        this.setState({ successAlertOpen: true });
	    })
	    .catch(err => {
	        console.log(err);
	        this.setState({ failAlertOpen: true });
	    })
    }
  }

	render() {
		return (
			<div className={stylesMain.body}>
				<Container>
					<Row>
					<h4>Damage Report</h4>
					<Loading msg={this.state.loadingMsg}></Loading>
					<FileUploader onFileUploaded={this.handleImageUploaded.bind(this)}></FileUploader>
					</Row>
				</Container>
			</div>
		)
	}

}

export default Damages;