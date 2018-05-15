import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  setLoggedIn,
  setLoggedOut,
  setAdmin,
} from '../../infrastructure/AuthActions';

// Import Style
import mainStyles from '../../main.css';
import styles from './Layout.css';
import arrows from './angle-double-right.svg.png';

// Import Components
import DevTools from '../../components/DevTools';
import Header from './components/Header/Header';
import UserBar from './components/UserBar/UserBar';
import Footer from './components/Footer/Footer';

import TokenUtils from '../../util/token.utils';

// Import Actions

export class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    this.setState({isMounted: true}); // eslint-disable-line
    const token = TokenUtils.token();
    if (token){
      if(!TokenUtils.isExpired(token)) {
        this.props.setLoggedIn();

        if (TokenUtils.isAdmin(token)) {
          this.props.setAdmin(true);
        }
      } else {
        TokenUtils.clearToken();
      }

    } 
  }

  render() {
    return (
      <div className="row no-gutters">
        <span className={mainStyles.zIndexFixer}></span>
        <div className={styles.backgrounds+" d-none d-xl-flex col-xl-2"}>
          <img className={styles.arrows1} src={arrows} />
        </div>
        <div className="col-xl-8">
          <Header />
          <UserBar /> 
          <div className={styles.container}>
            {this.props.children}   
          <Footer />
          </div>    
           
        </div>
        <div className={styles.backgrounds+" d-none d-xl-flex col-xl-2"}>
          <img className={styles.arrows2} src={arrows} />
        </div> 
      </div>

    );
  }
}

// redux mapping stuff
Layout.propTypes = {
  children: PropTypes.object.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.loggedIn,
    isAdmin: state.auth.isAdmin,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  //dispatch,
  setLoggedIn,
  setLoggedOut,
  setAdmin,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
