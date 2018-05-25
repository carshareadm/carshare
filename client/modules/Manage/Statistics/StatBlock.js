/**
 * Project       - ShaCar
 * Team          - Group 3 Carshare
 * Last Modified - 2018/05/25
 * Authors
 *               - Paul Crow
 */
import React, { Component, PropTypes } from 'react';
import {
  Container,
  Row,
  Col,
} from "reactstrap";
import { Link } from "react-router";
import manageSvc from '../../../services/manage.service';

import css from './StatBlock.css';

export class StatBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      error: false,
      isLoading: true,
    };
  }

  async componentDidMount() {
    try {
      const res = await manageSvc.stats(this.props.api);
      this.setState({
        ...this.state,
        data: res.data,
        isLoading: false,
      });
    } catch(e) {
      this.setState({
        ...this.state,
        error: true,
        isLoading: false,
      })
    }
  }

  loading() {
    return this.state.isLoading
    ? <Row>
        <Col>
          'Loading...'
        </Col>
      </Row>
    : '';
  }

  error() {
    return this.state.error
    ? <Row>
        <Col>
          {`Error loading ${this.props.title} stats`}
        </Col>
      </Row>
    : '';
  }

  capitalise = (str) => {
    return str && str.length > 1
    ? str.charAt(0).toUpperCase() + str.slice(1)
    : str && str.length == 1
    ? str.toUpperCase()
    : '';
  }

  words = (str) => {
    return str.split(/(?=[A-Z])/).join(' ');
  }

  line(key) {
    const val = this.state.data[key];
    const title = this.words(this.capitalise(key));
    return (
      <div key={key} className="clearfix">
        <span className="float-left">{title}</span>
        <span className="float-right bold">{val}</span>
      </div> 
    );
  }

  data() {
    return this.state.data
    ? <div>
        {Object.keys(this.state.data).map(m => this.line(m))}
      </div>
    : '';
  }

  render() {
    return (
      <Col className={css.statBlockContainer} xs="12" sm="6" lg="4">
        <Link className={css.link} to={`/manage/${this.props.api}`}>
          <img src={this.props.img} />
        </Link>
        <div className={css.statBlock}>
          <h4>{this.props.title}</h4>
          {this.loading()}
          {this.error()}
          {this.data()}
        </div>
      </Col>
    );
  }
}

StatBlock.propTypes = {
  title: PropTypes.string.isRequired,
  api: PropTypes.string.isRequired,
  img: PropTypes.object,
};

export default StatBlock;