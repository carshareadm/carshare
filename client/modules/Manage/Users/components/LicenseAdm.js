import React, { Component, PropTypes } from "react";
import {
  Button,
  Row,
  Col,
  FormGroup,
  Input,
  Label,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import Loading from '../../../Loading/Loading';
import * as manageSvc from "../../../../services/manage.service";
import stylesMain from '../../../../main.css';

import imagePlaceholder from '../../../images/i_image_placeholder.svg';


export class LicenseAdm extends Component {

  constructor(props)  {
    super(props);
    this.state = {
      licenseNumber: this.props.licenseNumber,      
      imageUrl: this.props.imageUrl,      
      approvedByAdmin: this.props.approvedByAdmin,
      isTouched: {
        licenseNumber: false,
        approvedByAdmin: false,
      },
      dropdownsOpen: {
        approvedByAdmin: false,
      },
    };
  }

  labels = {
    licenseNumber: 'License number',
    approvedByAdmin: 'Approved?',
  };

  errorMsgs = {
    licenseNumber: 'is required',
  };

  errors = {
    licenseNumber: false,
  };

  validate() {
    return {
      licenseNumber: this.state.licenseNumber.length < 1,
    }
  }

  isError(key) {
    const errorExists = this.errors[key];
    const touched = this.state.isTouched[key] === true;
    return errorExists && touched;
  }

  isFormInvalid() {
    return Object.keys(this.errors).some(x => this.errors[x] === true);
  }

  renderLabel(key, labelFor) {
    if (this.isError(key)) {
      return <Label htmlFor={labelFor} className={'text-danger'}>{this.labels[key]}: {this.errorMsgs[key]}</Label>
    }
    return <Label htmlFor={labelFor} >{this.labels[key]}</Label>
  }

  handleBlur(field) {
    this.setState({
      isTouched: Object.assign({}, this.state.isTouched, { [field]: true }),
    });
  }

  async handleInputChange(evt)
  {
    let field = evt.target.id;
    let value = evt.target.value;
    await this.setState({
      ...this.state,
      [field]: value,
      isTouched: { ...this.state.isTouched, [field]: true },
    });
    this.handleChanged();
  }

  renderTextFormGroup(field) {
    const placeholder = this.labels[field];
    return (
      <FormGroup>
        {this.renderLabel(field, field)}
        <Input
          type="text"
          name={field}
          id={field}
          placeholder={placeholder}
          className={this.isError(field) ? 'is-invalid' : ''}
          onChange={this.handleInputChange.bind(this)}
          onBlur={() => this.handleBlur(field)}
          value={this.state[field]}
        />
      </FormGroup>
    );
  }

  toggleDropDown(field, evt) {
    const dropdownState = {...this.state.dropdownsOpen};
    dropdownState[field] = !dropdownState[field];
    this.setState({dropdownsOpen: dropdownState});
  }

  async ddOnSelect(field, value, evt) {
    await this.setState({
      [field]: value,
      isTouched: {...this.state.isTouched, [field]: true},
      dropdownsOpen: {...this.state.dropdownsOpen, [field]: false},

    });
    this.handleChanged();
  }

  approvedDropdown() {
    const field = 'approvedByAdmin';
    const approved = 'APPROVED';
    const pending = 'PENDING';
    const text = this.state.approvedByAdmin ? approved : pending;
    
    const opts = [
      {state: false, text: pending},
      {state: true, text: approved},
    ].map(m => (<DropdownItem key={m.text} onClick={(e) => this.ddOnSelect(field, m.state, e)}>{m.text}</DropdownItem>));
    
    return (
      <FormGroup>
          {this.renderLabel(field, field)} <br />
          <ButtonDropdown isOpen={this.state.dropdownsOpen[field]} toggle={(e) => this.toggleDropDown(field, e)}>            
            <DropdownToggle caret size="sm">{text}</DropdownToggle>
            <DropdownMenu>
              {opts}
            </DropdownMenu>
          </ButtonDropdown>          
      </FormGroup>
    );
  }

  handleChanged() {
    this.props.onChanged({
      licenseNumber: this.state.licenseNumber,
      approvedByAdmin: this.state.approvedByAdmin,
      isInvalid: this.isFormInvalid(),
    });
  }

  renderImage() {
    return this.state.imageUrl && this.state.imageUrl.length > 0
    ? <img src={this.state.imageUrl} />
    : <img src={imagePlaceholder} />
  }

  render() {
    this.errors = this.validate();
    return (
      <div>
        <h5>License</h5>
        <Row>
          <Col>
            <div className={stylesMain.imgContainer}>
              {this.renderImage()}
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            {this.renderTextFormGroup('licenseNumber')}
            {this.approvedDropdown()}
          </Col>
        </Row>
      </div>
    );
  }

}

LicenseAdm.propTypes = {
  licenseNumber: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  approvedByAdmin: PropTypes.bool.isRequired,
  onChanged: PropTypes.func.isRequired,
};

export default LicenseAdm;