import React, { Component, PropTypes } from "react";

// Import Style
import stylesMain from '../../../../../main.css';

class Search extends Component {

  componentDidMount() {
    var myCallback = function() {
       if (document.readyState == 'complete') {
          google.search.cse.element.render(
          {
            div: "searchbox-content",
            tag: 'search'
         });
       } else {
           google.setOnLoadCallback(function() {
              google.search.cse.element.render(
              {
                div: "searchbox-content",
                tag: 'search'
              });
           }, true);
   		}
	};

	window.__gcse = {
	  parsetags: 'explicit',
	  callback: myCallback
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
	    console.log(window.__gcse);
	}

  render() {
    return(
      <div id="searchbox-content" style={{ backgroundColor: 'blue' }} className="content">
        <div className="gcse-search" data-resultsUrl="http://www.google.com" data-newWindow="true" data-queryParameterName="search" >
        </div>
      </div>
    );
  }
}

export default Search;
