/**
 * Project       - ShaCar
 * Team          - Group 3 Carshare
 * Last Modified - 2018/05/25
 * Authors
 *               - Paul Crow
 */
import React, { Component, PropTypes } from "react";
import {
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  Container,
  Row,
  Col,
  Alert,
} from "reactstrap";
import { Link } from "react-router";

import Loading from '../Loading/Loading';

import * as fileService from "../../services/file.service";

import * as validator from "validator";
import styles from "./FileUploader.css";
import stylesMain from '../../main.css';

//Profile component class
export class FileUploader extends Component {
  selectFile = "Select File";
  clearFile = "Clear";
  uploadFile = "Upload";

  loadingMessage = 'Uploading your file. Please wait...';

  state = {};

  constructor(props) {
    super(props);
    this.state = {
      selectedFileText: this.selectFile,
      fileSelected: false,
      isLoading: false,
      errorMessage: '',
    };

    this.onDismiss = this.onDismiss.bind(this);
  }

  setLoading(isLoading) {
    this.setState({isLoading: isLoading});
  }

  setError(msg) {
    this.setState({errorMessage: msg});
  }


  handleInputClick(e) {
    document.getElementById('file-upload').click();
  }

  handleFileSelected(e) {
    const target = e.target || e.srcEelment; // for edge/IE
    this.setState({
      selectedFileText: target.files[0].name,
      fileSelected: true,
    });
  }

  handleClear(e) {
    document.getElementById('file-upload').files = null;
    this.setState({
      selectedFileText: this.selectFile,
      fileSelected: false,
    });
  }

  handleUpload() {
    this.setLoading(true);
    fileService.getPresignedUploadKey(this.state.selectedFileText, this.props.isPublic)
      .then(res => {
        this.setLoading(false);
        this.uploadToS3(res.data);
      })
      .catch(e => {
        console.log(e);
        this.setLoading(false);
        this.setError('Upload failed: presigned key');
      });
    }
    
    uploadToS3(s3Policy) {
      this.setLoading(true);
      fileService.uploadToStorage(document.getElementById('file-upload').files[0], s3Policy)
      .then(res => {
        this.setLoading(false);
        this.postToShaCar(s3Policy.fields.key);
      })
      .catch(e => {
        console.log(e);
        this.setLoading(false);
        this.setError('Upload failed: file transfer');
      });
    }
    
    postToShaCar(filename) {
      this.setLoading(true);
      fileService.saveImageToShaCarDb(filename, this.props.isPublic)
      .then(res => {
        this.setLoading(false);
        this.props.onFileUploaded(res.data);        
      })
      .catch((e) => {
        console.log(e);
        this.setLoading(false);
        this.setError('Upload failed: server error');
      });
  }

  onDismiss() {
    this.setError('');
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
    const load = this.state.isLoading ? (<Loading msg={this.loadingMessage}></Loading>) : '';
    const alert = this.state.errorMessage.length > 0 ? this.alert() : '';
    // Here goes our page
    return (
      <div>
        {alert}
        <Input
          type="file"
          name="file"
          id="file-upload"
          className={styles.displayNone}
          onChange={this.handleFileSelected.bind(this)}
        />
        <InputGroup size="sm">
          <Input
            readOnly={true}
            value={this.state.selectedFileText}
            id="file-name"
            onClick={this.handleInputClick.bind(this)}
          />
          <InputGroupAddon addonType="append">
            <Button color="secondary" onClick={this.handleClear.bind(this)}>{this.clearFile}</Button>
          </InputGroupAddon>
          <InputGroupAddon addonType="append">
            <Button
              color="primary"
              disabled={!this.state.fileSelected}
              onClick={this.handleUpload.bind(this)}
            >
              {this.uploadFile}
            </Button>
          </InputGroupAddon>              
        </InputGroup>
        {load}
      </div>
    );
  }
}
FileUploader.propTypes = {
  onFileUploaded: PropTypes.func.isRequired,
  isPublic: PropTypes.bool.isRequired,
};

export default FileUploader;
