import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Import Style
import styles from './Layout.css';
import arrows from './angle-double-right.svg.png';

// Import Components
import DevTools from '../../components/DevTools';
import Header from './components/Header/Header';
import UserBar from './components/UserBar/UserBar';
import Footer from './components/Footer/Footer';

// Import Actions

export class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    this.setState({isMounted: true}); // eslint-disable-line
  }


  render() {
    return (
      <div className="row no-gutters">
        <div className={styles.backgrounds+" d-none d-xl-flex col-xl-2"}>
          <img className={styles.arrows1} src={arrows} />
        </div>
        <div className="col-xl-8">
          <Header />
          <div className={styles.container}>
            {this.props.children}   
            <Footer />
          </div>    
          <UserBar />  
        </div>
        <div className={styles.backgrounds+" d-none d-xl-flex col-xl-2"}>
          <img className={styles.arrows2} src={arrows} />
        </div> 
      </div>

    );
  }
}

Layout.propTypes = {
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    foo: store.foo, // dont use foo
  };
}

export default connect(mapStateToProps)(Layout);
