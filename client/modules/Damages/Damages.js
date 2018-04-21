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
	      message: ""
	    };
  	}


  	handleSubmit(event){
	    event.preventDefault();
	    http
	        .client()
	        .post(`/damage/${this.props.location.query.bookingId}/createDamage`, {
	          description:this.state.descr,
	          image:this.state.image
	        })
		    .then(res => {
		        console.log(res);
		        this.setState({ message:"Thank you for your report!" });
		    })
		    .catch(err => {
		        console.log(err);
		        this.setState({ message:err });
		    })
  	}

	handleInputChange(event){
	  	this.setState({
	  		descr:event.target.value
	  	});
	}

  	handleImageUploaded(img){
  		console.log("Images ", img)
  		console.log("Images id ", img._id)
  		this.setState({
  			image:img._id
  		})
  	}

  	displayDescrForm(){
  		return(
  			<div>
  				<FormGroup>
	            <Label htmlFor="descr">Description *</Label>
	            <Input
	              type="text"
	              name="descr"
	              id="descr"
	              placeholder="Describe the damage"
	              value={this.state.description}
	              onChange={this.handleInputChange.bind(this)}
	            />
	            <FormFeedback>
	              A  description address is required.
	            </FormFeedback>
	        </FormGroup>
	         <Button
	            type="submit"
	            disabled={this.state.descr==""}
	            outline
	            color="success"
	            size="lg"
	            block
	          >
	            Submit
	          </Button>
  			</div>
  		)
  	}

  	displayForm(){
  		return(
			<Form className="novalidate" onSubmit={this.handleSubmit.bind(this)}>
			<FileUploader onFileUploaded={this.handleImageUploaded.bind(this)}></FileUploader>
	        {this.state.image? this.displayDescrForm() : null}
	    </Form>
  		)
  	}

  	displayMessage(){
  		return(
  			<div>
	  			<div className={styles.damageMessage}>{this.state.message}</div>
	  			<Link to={"/history"}>
	              <Button className={stylesMain.buttons} color="primary" size="lg">Back to History</Button>
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
						<h4>Damage Report</h4>
						{this.state.message ? this.displayMessage() : this.displayForm()}
			        </Col>
					</Row>
				</Container>
			</div>
		)
	}

}

export default Damages;