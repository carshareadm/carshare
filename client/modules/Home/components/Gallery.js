//Import react
import React, { Component, PropTypes } from 'react';

import styles from './Gallery.css'

export class Gallery extends Component {
  constructor(props) {
  	super(props);
  	this.state = {currentSlide:"bnImg1"};
  }

  render() {
    // Here goes our page
    return (
        <div className={styles.banner}>
	        <div className={styles.bannerImage+" "+styles.bnImg1}></div>
	        <div className={styles.bannerImage+" "+styles.bnImg2}></div>
	        <div className={styles.bannerImage+" "+styles.bnImg3}></div>
	        <div className={styles.bannerImage+" "+styles.bnImg4}></div>
        </div>
     )
	};
}

export default Gallery;