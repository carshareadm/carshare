import React, { Component, PropTypes } from "react";

// Import Style
import stylesMain from '../../../main.css';

function setupGoogleSearch(callback) {
    window.__gcse = {
      parsetags: 'explicit',
      callback: callback,
    };

    (function() {
      var cx = '000397261121787994763:drhydcsx3mk';
      var gcse = document.createElement('script');
      gcse.type = 'text/javascript';
      gcse.async = true;
      gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(gcse, s);
    })();
}

class Search extends Component {

  renderGoogleSearch() {
    google.search.cse.element.render({
      div: "searchbox-content",
      tag: 'searchbox-only',
      attributes: { resultsUrl: '/search' }
    });

    const results = document.getElementById("gcse-results-wrapper");
    if (results) { results.innerHTML = ""; }
    google.search.cse.element.render({
      div: "gcse-results-wrapper",
      tag: 'searchresults-only'
    });
  }

  googleSearchCallback() {
    if (document.readyState == 'complete') {
          this.renderGoogleSearch();
     } else {
           google.setOnLoadCallback(() => this.renderGoogleSearch(), true);
      }   
  }

  componentDidMount() {
    setupGoogleSearch(() => this.googleSearchCallback());
	}

  render() {
    return(
      <div id="searchbox-content" style={{ width: '90%' }} className="content">
        <div className="gcse-search" 
            data-resultsWrapperClass="gcse-results-wrapper"
            data-resultsUrl="http://www.google.com" 
            data-newWindow="true" 
            data-queryParameterName="search" >
        </div>
      </div>
    );
  }
}

export default Search;
