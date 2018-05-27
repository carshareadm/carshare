/**
 * Project       - ShaCar
 * Team          - Group 3 Carshare
 * Last Modified - 2018/05/25
 * Authors
 *               - Paul Crow
 */
import React from 'react';
import { withRouter } from 'react-router';
import * as TokenUtils from '../util/token.utils';

export default function requireAuth(Component) {

  class AuthenticatedComponent extends React.Component {
    isLoggedIn = false;

    componentWillMount() {      
      this.checkAuth();
    }

    checkAuth() {      
      this.isLoggedIn = TokenUtils.token() && !TokenUtils.isExpired(TokenUtils.token());
      if (!this.isLoggedIn) {
        const location = this.props.location;
        const redirect = location.pathname + location.search;

        this.props.router.push(`/login`);
      }
    }

    render() {
      return this.isLoggedIn
        ? <Component { ...this.props } />
        : null;
    }

  }

  return withRouter(AuthenticatedComponent);
}

