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
import stylesMain from '../../main.css';

import HistoryItem from './components/HistoryItem'

export class History extends Component {

  	render() {
		return (
      		<div className={stylesMain.body}>
		        <Container>
		        	<HistoryItem />
		        </Container>
       		</div>
		)
	}
	
}

export default History;