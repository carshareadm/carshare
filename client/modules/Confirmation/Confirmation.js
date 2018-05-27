/**
 * Project       - ShaCar
 * Team          - Group 3 Carshare
 * Last Modified - 2018/05/25
 * Authors
 *               - Paul Crow
 *               - Matthew Ryan
 */
import React, { Component, PropTypes } from 'react'; 
import { Link } from 'react-router';
import {
  Button,
  FormGroup,
  Label,
	Input,
  Container,
  Row,
  Col,
  Alert,
} from "reactstrap";


import stylesMain from '../../main.css';

import * as confirmSvc from "../../services/confirm.service";

import Loading from '../Loading/Loading';

export class Confirmation extends Component { 
  state = {};
  verifyingCodeMsg = "Please wait while we verify the code...";
  requestingCodeMsg = "Please wait while we SMS a new code to your mobile..."
  loadingMsg = '';

  DELETE = 'Delete';
  REGISTER = 'Register';
  ACCOUNT_UPDATE = 'AccountUpdate';

  internalServerError = 'An error occured. Please try again';

  constructor(props) {
    super(props);
    console.log('props', this.props);
    this.state = {
      code: '',
      isSubmitting: false,
      errorMessage: '',
    };
    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss() {
    this.setState({ errorMessage: '' });
  }

  handleCodeChanged(event) {
    this.setState({ code: event.target.value });
  }

  handleSubmit(event) {
    if (this.state.code && this.state.code.length > 0) {
      this.loadingMsg = this.verifyingCodeMsg;
      this.setSubmitting(true);
      console.log(this.state.code, this.props.codeType);
      confirmSvc.confirmWithCode(this.state.code, this.getCodeType())
        .then(() => {
          this.setSubmitting(false);
          this.props.onCodeConfirmed();
        })
        .catch(e => {
          this.setSubmitting(false);
          this.handleError(e.response);
        });
    }
  }

  handleError(response) {
    if (response.statusCode === 500) {
      this.setState({errorMessage: this.internalServerError});
    } else {
      this.setState({errorMessage: response.data});
    }
  }

  getCodeType() {
    return this.props.codeType === this.DELETE ? this.ACCOUNT_UPDATE : this.props.codeType;
  }

  handleRequestNewCode(event) {
    this.loadingMsg = this.requestingCodeMsg;
    this.setSubmitting(true);

    confirmSvc.requestConfirmationCode(this.props.verificationMethod, this.getCodeType())
    .then(() => this.setSubmitting(false))
    .catch(e => {
      this.setSubmitting(false);
      this.handleError(e.response);
    });
  }

  setSubmitting(isSubmitting) {
    this.setState({isSubmitting: isSubmitting})
  }

  alert() {
    if (this.state.errorMessage.length > 0) {
      return (
        <Alert color="danger" isOpen={true} toggle={this.onDismiss}>
          {this.state.errorMessage}
        </Alert>
      );
    }
  }

  render() {
    const load = (<Loading msg={this.loadingMsg}></Loading>);
    const alert = this.alert();
    const codeType = this.props.codeType === this.REGISTER
    ? 'registration'
    : this.props.codeType === this.DELETE
    ? 'DELETION'
    : 'update';
    return (
      <div className={stylesMain.body}>
        <Container>
          <Row>
            <Col>              
              <h1 className={stylesMain.title}>Confirmation</h1>
              {alert}
            </Col>
          </Row>
          <Row>
            <Col>
              A confirmation code has been sent via SMS to your mobile number. 
              Please enter it below to confirm your account {codeType}
            </Col>
          </Row>
          <Row>
            <Col>
              <br />
              <Input onChange={this.handleCodeChanged.bind(this)} />
              <br />
            </Col>
          </Row>
          <Row>
            <Col>
              If you did not receive a code, <Button color="link" onClick={this.handleRequestNewCode.bind(this)}>request a new one</Button>
            </Col>
          </Row>

          <Row>
            <Col>
              <Button className={stylesMain.buttonsSquare} onClick={this.handleSubmit.bind(this)}>Submit</Button>
            </Col>
          </Row>
          {this.state.isSubmitting ? load : ''}

        </Container>
      </div>
    );
  }
};

Confirmation.propTypes = {
  onCodeConfirmed: React.PropTypes.func,
  codeType: React.PropTypes.string,
  verificationMethod: React.PropTypes.string,
};

export default Confirmation;