/**
 * Project       - ShaCar
 * Team          - Group 3 Carshare
 * Last Modified - 2018/05/25
 * Authors
 *               - Paul Crow
 *               - Inga Pflaumer
 *               - Matthew Ryan
 */
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

import styles from './Damages.css';
import stylesMain from '../../main.css';

export class Damages extends Component {

	constructor(props){
	    super(props);
	    this.setFromVisible = this.setFormVisible.bind(this)
	    this.displayFormText = this.displayFormText.bind(this)
	    this.state = {
	      descr: "",
	      image: "",
	      message: "",
	      form: false,
	    };
  	}

  	handleSubmit(event){
	    event.preventDefault();
	    http
	        .client()
	        .post(`/damage/${this.props.location.query.bookingId}/createDamage`, {
	          description: this.state.descr,
	          image: this.state.image,
	        })
		    .then(res => {
		        this.setState({ message: "Thank you for your report!" });
		    })
		    .catch(err => {
		        this.setState({ message: err });
		    })
  	}

	handleInputChange(event){
	  	this.setState({
	  		descr: event.target.value,
	  	});
	}

  	handleImageUploaded(img){
  		console.log(img);
  		this.setState({
  			image: img._id,
  			form : true,
  		})
  	}

  	setFormVisible(){
  		this.setState({
  			form : true,
  		})
  	}

  	displayFormText(){
  		return (
  			<div>
	  			<FormGroup>
		            <Label htmlFor="descr">Description *</Label>
		            <Input
		              type="textarea"
		              rows="5"
		              name="descr"
		              id="descr"
		              placeholder="Describe the damage"
		              value={this.state.description}
		              onChange={this.handleInputChange.bind(this)}
		            />
		            <FormFeedback>
		              A  description is required.
		            </FormFeedback>
		        </FormGroup>
		         <Button
		         	className={stylesMain.buttonSquare}
		            type="submit"
		            disabled={this.state.descr==""}
		            outline
		            color="success"
		            block
		          >
		            Submit
		          </Button>
  			</div>
  		)
  	}


  	displayForm(){
  		return(
			<div className={stylesMain.body}>
			<p><strong>Please Report Damage</strong><p/>
            			Please upload a photo of the damage and describe the details in the provided space.</p>
			<Form className={stylesMain.formDamages} onSubmit={this.handleSubmit.bind(this)}>
				<FileUploader
					onFileUploaded={this.handleImageUploaded.bind(this)}
					isPublic={false} />
				
			<Button className={stylesMain.buttonSquare} onClick={(e) => this.setFormVisible()} color="success">Skip Image Uploading</Button>
			{this.state.form? this.displayFormText() : null}
	    </Form>
	    </div>
  		)
  	}

  	displayMessage(){
  		return(
  			<div>
	  			<div className={stylesMain.damageMessage}>{this.state.message}</div>
	  			<br/>
	  			<Link to={"/history"}>
	              <Button className={stylesMain.buttonSquare} color="success">Back to Bookings</Button>
	            </Link>
            </div>
  		)
  	}

	render() {
		return (
			<div className={stylesMain.body}>
				<Container>
					<Row>
					<Col>
						<h1 className={stylesMain.title}>Damage Report</h1>
						{!this.state.message ? this.displayForm() : this.displayMessage()}
			        </Col>
					</Row>
				</Container>
			</div>
		)
	}

}

export default Damages;