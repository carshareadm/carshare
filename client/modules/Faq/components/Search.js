import React, { Component, PropTypes } from "react";

// Import Style
import stylesMain from '../../../main.css';
import styles from './Search.css'

class Search extends Component {
  constructor(){
    super()
    this.saveQuery = this.saveQuery.bind(this);
    this.clear = this.clear.bind(this);
  }

  clear() {
    this.props.onSearch("");
  }

  saveQuery(event) {
    this.props.onSearch(event.target.value)
  }

  render() {
    return(
      <div style={{ width: '90%' }} className="content">
      <h4 className={stylesMain.h4}>Search FAQ </h4>
        <input name="searchquery" className={styles.input} onChange={this.saveQuery} value={this.props.query} />
        &nbsp;
        <button className={styles.submitButton} onClick={this.clear}>Clear</button>
      </div>
    );
  }
}


export default Search;
