//Import react
import React, { Component, PropTypes } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  setLoggedIn,
  setLoggedOut,
  setAdmin,
} from "../../../infrastructure/AuthActions";
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
import { Link } from "react-router";
import * as http from "../../../util/http";
import * as tokenUtil from "../../../util/token.utils";
import * as confirmService from '../../../services/confirm.service';
import Confirmation from '../../Confirmation/Confirmation';

import stylesMain from '../../../main.css';
import Loading from '../../Loading/Loading';


const MSG_REQUESTING_CODE = 'Requesting confirmation code...';
const MSG_DELETING = 'Deleting your account...';

export class DeleteProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      loadingMsg: '',
      isProceeding: false,
      isConfirmed: false,
    };
  }
 
  doDelete() {
    console.log('doing delete');
    this.setState({
      isLoading: true,
      loadingMsg: MSG_DELETING,
    })
    
    http.client()
    .put('/profile/delete')
    .then(async res => {
      await this.setState({
        isLoading: false,
        isConfirmed: true,
      })
      tokenUtil.clearToken();
      this.props.setLoggedOut()
    })
    .catch(e => console.log(e));
  }

  confirmation() {
    if (this.state.isProceeding && !this.state.isConfirmed) {
      return (
        <Col>
          <Confirmation 
            onCodeConfirmed={(e) => this.doDelete()}
            codeType="Delete"
            verificationMethod="SMS"
          />
        </Col>
      );
    } else if (this.state.isProceeding && this.state.isConfirmed) {
      return (
        <Col>
          <h5>Your account is deleted</h5>
        </Col>
      );
    } else {
      return (
        <Col>
          <p>
            I understande that continuing will DELETE my account and I will be unable to use ShaCar services
          </p>
          <p>
            <Button color="danger" onClick={(e) => this.proceed()}>Yes, proceed</Button>
          </p>
        </Col>
      );
    }
  }

  async proceed() {
    await this.setState({
      isLoading: true,
      loadingMsg: MSG_REQUESTING_CODE,
    });
    confirmService.requestConfirmationCode(confirmService.VerificationTypes.SMS, confirmService.CodeTypes.ACCOUNT_UPDATE)
    .then(async () => {
      await this.setState({
        isProceeding: true,
        isLoading: false,
      });
    });
  }

  render() {
    const loading = this.state.isLoading
    ? <Loading msg={this.state.loadingMsg} />
    : '';

    const confirmation = this.confirmation();

    return (
      <div className={stylesMain.body}>
        <Container>
          <Row>
            <Col>              
              <h1 className={stylesMain.title}>DELETE ACCOUNT</h1>
              {loading}
            </Col>
          </Row>
          <Row>
            {confirmation}
          </Row>

        </Container>
      </div>
    );
  }
}


const mapStateToProps = state => {
  console.log("state", state);
  return {
    loggedIn: state.auth.loggedIn,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      //dispatch,
      setLoggedIn,
      setLoggedOut,
      setAdmin,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(DeleteProfile);
