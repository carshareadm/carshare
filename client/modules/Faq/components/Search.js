import React, { Component, PropTypes } from "react";

// Import Style
import stylesMain from '../../../main.css';

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
        <input name="searchquery" onChange={this.saveQuery} value={this.props.query} />
        <button onClick={this.clear}>clear</button>
      </div>
    );
  }
}

export default Search;
