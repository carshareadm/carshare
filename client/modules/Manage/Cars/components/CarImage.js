import React, { Component, PropTypes } from "react";

import carPlaceholderImg from '../../../images/i_car.png';

import tmpStyles from './CarImage.css';
import * as http from '../../../../util/http';

export class CarImage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      verifiedUrl: '', 
      loading: true,
      error: false,
    }
  }

  componentDidMount() {
    this.preLoader(this.props.imageUrl);
  }

  preLoader(url) {
    const img = new Image();
    img.onload = async () => { 
      await this.setImageUrl(url);
      this.setLoading(false, false);
    }
    img.onerror = () => {
      this.setLoading(false, true);
    };
    img.src = url;
  }

  async setImageUrl(url) {
    await this.setState({
      ...this.state,
      verifiedUrl: url,
    });
  }

  setLoading(isLoading, error) {
    this.setState({
      ...this.state,
      loading: isLoading,
      error: error,
    })
  }

  renderImage() {
    return this.state.verifiedUrl.length > 0
    ? <img src={this.state.verifiedUrl} />
    : <img src={carPlaceholderImg} />
  }

  render() {
    return (

      <div className={tmpStyles.imgContainer}>
        {this.renderImage()}
      </div>

    );
  }

}

CarImage.propTypes = {
  imageUrl: PropTypes.string.isRequired,
}

export default CarImage;