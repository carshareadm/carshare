import React, { Component, PropTypes } from 'react';
import {
  Row,
  Col,
  Button,
} from "reactstrap";

import Loading from '../../Loading/Loading';
import EnquiryAdm from "./components/EnquiryAdm";
import manageSvc from "../../../services/manage.service";
import stylesMain from '../../../main.css';

class EnquiriesAdm extends Component
{
  constructor(props) {
    super(props);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.validate = this.validate.bind(this);
    this.state = {
      enquiries: [],
      isloading: false,
    };
  }

  componentDidMount()
  {
    this.fetchEnquiries();
  }

async fetchEnquiries()
  {
    this.setLoading(true);

    try
    {
      const res = await manageSvc.enquiries.getEnquiries();
      let enquiries = [];
      res.data.map((enq) => {
        enquiries.push({
          _id: enq._id ? enq._id : '',
          emailFrom: enq.emailFrom ? enq.emailFrom : '',
          name: enq.name ? enq.name : '',
          message: enq.message ? enq.message : '',
          response: enq.response ? enq.response : '',
          receivedAt: enq.receivedAt ? enq.receivedAt : '',
          responseAt: enq.responseAt ? enq.responseAt : '',
          needsResponse: !enq.responseAt,
          touched: {
            response: false,
          },
        })
      });
      await this.setState({ enquiries: enquiries });
      this.setLoading(false);
    }
    catch (e)
    {
      console.log(e);
      this.setLoading(false);
    }
  }

  setLoading(isLoading) {
    this.setState({isLoading: isLoading})
  }

  handleRefresh()
  {
    this.fetchEnquiries();
  }

  async handleSubmit(evt, index)
  {
    evt.preventDefault();
    this.setLoading(true);

    const enquiries = this.state.enquiries.slice();
    const enquiry = enquiries[index];

    try
    {
      const res = await manageSvc.enquiries.updateEnquiry(enquiry);
      console.log(res);
      enquiry.responseAt = res.data.responseAt;
      enquiry.needsResponse = false;
      enquiry.touched.response = false;
      await this.setState({ enquiries: enquiries });
      this.setLoading(false);
    }
    catch (e)
    {
      console.log(e);
      this.setLoading(false);
    }
  }

  async handleReset(evt, index)
  {
    evt.preventDefault();
    const enquiries = this.state.enquiries.slice();
    enquiries[index].response = '';
    enquiries[index].touched.response = false;
    await this.setState({ enquiries: enquiries});
  }

  async handleChange(evt, index)
  {
    const field = evt.target.id;
    const value = evt.target.value;
    const enquiries = this.state.enquiries.slice();
    enquiries[index][field] = value;
    enquiries[index].touched[field] = true;
    await this.setState({ enquiries: enquiries });
  }

  validate(index)
  {
    const valids = {
      response: this.state.enquiries[index].response.length > 0,
    }
    return valids;
  }

  render()
  {
    const loading = this.state.isLoading ? <Loading /> : '';

    return (
      <div className={stylesMain.body}>
        <Row>
          <Col>
            <h1 className={stylesMain.title}>Manage Enquiries</h1>
            <p>
              You can respond to enquiries submitted by users.
              Click Refresh to get the latest enquiries.
            </p>
            <Button onClick={this.handleRefresh} block >
              Refresh
            </Button>
            <hr className={stylesMain.clearBoth} />
          </Col>
        </Row>

        <Row>
          <Col>
            {loading}
            {
              this.state.enquiries.map((enquiry, index) => {
                return (
                  <EnquiryAdm
                    key={index}
                    index={index}
                    enquiry={enquiry}
                    onSubmit={ (evt, index) => this.handleSubmit(evt, index) }
                    onReset={ (evt, index) => this.handleReset(evt, index) }
                    onChange={ (evt, index) => this.handleChange(evt, index) }
                    validate={ (index) => this.validate(index) }
                  />
                );
              })
            }
          </Col>
        </Row>
      </div>
    );
  }

}

module.exports = {
  EnquiriesAdm: EnquiriesAdm,
}
