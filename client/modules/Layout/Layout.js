import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Import Style
import styles from './Layout.css';

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
      <div>
        {this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && <DevTools />}
        <div>
          <Header />
          <div className={styles.container}>
            {this.props.children}
          </div>
          <UserBar />
          <Footer />
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
