//Import react
import React, { Component, PropTypes } from 'react'; 
import { Link } from 'react-router';
import {
	Button,
	FormGroup,
	Label,
	Input,
	Form,
	FormFeedback,
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

	constructor(props){
	    super(props);
	    this.state = {
	      descr: "",
	      image: "",
	    };
  	}

	valids = {};

  	validate(){
	    const valids = {
	      descr: this.state.descr.length > 0,
	    }
	    return valids;
	  }

   	isValid(key){
	    const valid = this.valids[key];
	    return valid;
  	}

  	formIsValid(){
  		return Object.keys(this.valids).every(field => this.valids[field] === true);
  	}

  	handleSubmit(event){
	    event.preventDefault();
	    if (this.formIsValid()) {
	      http
	        .client()
	        .post(`/${booking}/createDamage`, {
	          description:this.state.descr,
	          booking:this.props.query.bookingId
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

	handleInputChange(event){
	  	this.setState({
	  		descr:event.target.value
	  	});
	}

  	handleImageUploaded(){

  	}

	render() {
		this.valids = this.validate();
		const isDisabled = !this.formIsValid() || this.state.successAlertOpen || this.state.failAlertOpen;
		return (
			<div className={stylesMain.body}>
				<Container>
					<Row>
						<h4>Damage Report</h4>
						<FileUploader onFileUploaded={this.handleImageUploaded.bind(this)}></FileUploader>
						<Form className="novalidate" onSubmit={this.handleSubmit.bind(this)}>
				            <FormGroup>
				                <Label htmlFor="descr">Description *</Label>
				                <Input
				                  type="text"
				                  name="descr"
				                  id="descr"
				                  placeholder="Describe the damage"
				                  className={this.isValid('descr') ? '' : 'is-invalid'}
				                  value={this.state.description}
				                  onChange={this.handleInputChange.bind(this)}
				                />
				                <FormFeedback>
				                  A  description address is required.
				                </FormFeedback>
				            </FormGroup>
			                 <Button
				                type="submit"
				                disabled={isDisabled}
				                outline
				                color="success"
				                size="lg"
				                block
				              >
				                Submit
				              </Button>
			            </Form>
					</Row>
				</Container>
			</div>
		)
	}

}

export default Damages;