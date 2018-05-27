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

export default function requireAdminAuth(Component) {

  class AdminAuthenticatedComponent extends React.Component {
    isLoggedIn = false;
    isAdmin = false;

    componentWillMount() {      
      this.checkAuth();
    }

    checkAuth() {      
      const token = TokenUtils.token();
      this.isLoggedIn = token && !TokenUtils.isExpired(token)
      this.isAdmin = token && TokenUtils.isAdmin(token);

      if (!this.isLoggedIn) {
        this.props.router.push(`/login`);
      } else if (!this.isAdmin) {
        this.props.router.push('/unauthorised');
      }
    }

    render() {
      return this.isLoggedIn && this.isAdmin
        ? <Component { ...this.props } />
        : null;
    }

  }

  return withRouter(AdminAuthenticatedComponent);
}

