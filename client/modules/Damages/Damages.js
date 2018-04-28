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
	    this.state = {
	      descr: "",
	      image: "",
	      message: "",
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
  		this.setState({
  			image: img._id,
  		})
  	}


  	displayForm(){
  		return(
			<div>
			<p><strong>Please Report Damage</strong><br/>
            			Please upload a photo of the damage and describe the details in the provided space.</p>
			<Form className={styles.form} onSubmit={this.handleSubmit.bind(this)}>
			<FileUploader onFileUploaded={this.handleImageUploaded.bind(this)}></FileUploader>
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
	         	className={styles.button}
	            type="submit"
	            disabled={this.state.descr==""}
	            outline
	            color="success"
	            block
	          >
	            Submit
	          </Button>
	    </Form>
	    </div>
  		)
  	}

  	displayMessage(){
  		return(
  			<div>
	  			<div className={styles.damageMessage}>{this.state.message}</div>
	  			<br/>
	  			<Link to={"/history"}>
	              <Button className={styles.button} color="success">Back to History</Button>
	            </Link>
            </div>
  		)
  	}

	render() {
		return (
			<div className={styles.body}>
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