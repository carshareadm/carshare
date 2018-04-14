import React, { Component, PropTypes } from "react";
import { Container, Row, Col, Modal, ModalBody } from "reactstrap";
import styles from "./Loading.css";

export class Loading extends Component {

  constructor(props) { super(props); }
  
  message() {
    if (this.props.msg && this.props.msg.length > 0) {
      return (
        <p>{this.props.msg}</p>
      );
    }
  }

  render() {
    return (
      <Modal isOpen={true} zIndex={99999} centered={true}>
        <ModalBody>
          <Row>
            <Col>
              {this.message()}
              <div className={styles.gradientLoader} />
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    );
  }
}

Loading.propTypes = {
  msg: React.PropTypes.string,
};

export default Loading;
