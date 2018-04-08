import React, { Component, PropTypes } from "react";
import {
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  Container,
  Row,
  Col,
} from "reactstrap";
import { Link } from "react-router";
import * as fileService from "../../services/file.service";

import * as validator from "validator";
import styles from "./FileUploader.css";

//Profile component class
export class FileUploader extends Component {
  selectFile = "Select File";
  clearFile = "Clear";
  uploadFile = "Upload";

  state = {};

  constructor(props) {
    super(props);
    this.state = {
      selectedFileText: this.selectFile,
      fileSelected: false,
    };
  }

  handleInputClick(e) {
    document.getElementById('file-upload').click();
  }

  handleFileSelected(e) {
    this.setState({
      selectedFileText: e.target.files[0].name,
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
    fileService.getPresignedUploadKey(this.state.selectedFileText)
      .then(res => {
        this.uploadToS3(res.data);
      })
      .catch(e => console.log(e));
  }

  uploadToS3(s3Policy) {
    fileService.uploadToStorage(document.getElementById('file-upload').files[0], s3Policy)
      .then(res => {
        this.postToShaCar(s3Policy.fields.key);
      })
      .catch(e => console.log(e));
  }

  postToShaCar(filename) {
    fileService.saveImageToShaCarDb(filename)
      .then(res => this.props.onFileUploaded(res.data))
      .catch((e) => console.log(e));
  }

  render() {
    // Here goes our page
    return (
      <div>
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
      </div>
    );
  }
}
FileUploader.propTypes = {
  onFileUploaded: React.PropTypes.func,
};

export default FileUploader;
