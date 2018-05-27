/**
 * Project       - ShaCar
 * Team          - Group 3 Carshare
 * Last Modified - 2018/05/25
 * Authors
 *               - Inga Pflaumer
 */
//Import react
import React, { Component, PropTypes } from 'react';

import styles from './Gallery.css'

const SLIDES = ["bnImg1", "bnImg2", "bnImg3", "bnImg4"];
const INTERVAL = 3000;

export class Gallery extends Component {
  constructor(props) {
  	super(props);
  	this.state = {currentSlide:SLIDES[0]};

  	//Bind the function to the class
	this.nextSlide = this.nextSlide.bind(this);
  }

  componentDidMount(){
  	this.intervalId = window.setInterval(this.nextSlide, INTERVAL);
  }

  componentWillUnmount(){
  	if(this.intervalId){
  		window.clearInterval(this.intervalId);
  	}
  }

  nextSlide(){
  	const current = SLIDES.indexOf(this.state.currentSlide);
  	const next = current<(SLIDES.length-1) ? current+1 : 0;
  	this.setState({currentSlide:SLIDES[next]});
  }

  styleName(slide){
  	const state = slide===this.state.currentSlide ? "active" : "inactive";
  	return styles.bannerImage+" "+styles[slide]+" "+styles[state];
  }

  styleDot(slide){
  	const state = slide===this.state.currentSlide ? "selected" : "unselected";
  	return styles.dot+" "+styles[state];
  }

  render() {
    // Here goes our page
    return (
        <div className={styles.banner}>
        	{SLIDES.map(x => <div key={x} className={this.styleName(x)}></div>)}
        	<ul className={styles.dots}>
        		{SLIDES.map(x => <div key={x} className={this.styleDot(x)}></div>)}
        	</ul>
        </div>
    )};
}

export default Gallery;