/**
 * Project       - ShaCar
 * Team          - Group 3 Carshare
 * Last Modified - 2018/05/25
 * Authors
 *               - Jason Koh
 */
import React, { Component, PropTypes } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardText,
  Form,
  FormGroup,
  FormFeedback,
  Input,
  Label,
} from "reactstrap";

import stylesMain from '../../../../main.css';

class EnquiryAdm extends Component
{
  renderMultiline(text)
  {
    const lines = text
      .split('\n')
      .map((line, index) => <span key={index}>{line}<br /></span>);
    return (
      <CardText>
        {lines}
      </CardText>
    );
  }

  render()
  {
    const enquiry = this.props.enquiry;
    const index = this.props.index;
    let responsePart;

    if (enquiry.needsResponse)
    {
      const valids = this.props.validate(index);
      const touched = enquiry.touched;
      const isDisabled = Object
        .keys(valids)
        .some(field => !valids[field]);

      responsePart = (
        <CardBody>
          <Form
            noValidate
            onSubmit={(evt) => this.props.onSubmit(evt, index)}
            onReset={(evt) => this.props.onReset(evt, index)}
          >
            <FormGroup>
              <Label htmlFor="response">Response *</Label>
              <Input
                type="textarea"
                rows="3"
                name="response"
                id="response"
                placeholder="Response"
                value={enquiry.response}
                className={(valids.response || !touched.response) ? '' : 'is-invalid'}
                onChange={(evt) => this.props.onChange(evt, index)}
              />
              <FormFeedback>
                A non-empty response is required.
              </FormFeedback>
            </FormGroup>
            <Button type="reset">Cancel</Button>
            <Button
              type="submit"
              disabled={isDisabled}
              outline
              color="success"
            >
              Send
            </Button>
          </Form>
        </CardBody>
      )
    }
    else
    {
      responsePart = (
        <CardBody>
          <em>Response {new Date(enquiry.responseAt).toString()}</em>
          {this.renderMultiline(enquiry.response)}
        </CardBody>
      )
    }

    return (
      <Card key={index}>
        <CardHeader>
          {enquiry.name + ' <' + enquiry.emailFrom + '>'}
        </CardHeader>
        <CardBody>
          <em>Received {new Date(enquiry.receivedAt).toString()}</em>
          {this.renderMultiline(enquiry.message)}
        </CardBody>
          {responsePart}
      </Card>
    );
  }
}

export default EnquiryAdm;
