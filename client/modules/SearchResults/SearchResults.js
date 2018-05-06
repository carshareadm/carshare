//Import react
import React, { Component, PropTypes } from "react";
import stylesMain from "../../main.css";

import {
  Container
} from "reactstrap";

export class SearchResults extends Component {
	render() {
		return (
			<div className={stylesMain.body}>
				<Container>
					<div id="gcse-results-wrapper"><i>Loading...</i></div>
				</Container>
			</div>
		)
	}
}

export default SearchResults;