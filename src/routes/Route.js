import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

/**
 * Manages access to routes
 * Routes that are private cannot be accessed if the user is not logged in.
 * The accesses are defined in src/routes.indes.js passed as a parameter.
 * Routes that do not exist should be redirected to page 404.
 * Users who have logged in to the system should be redirected to the dashboard
 * if they try to access a non-private route.
 * @function @export @default
 */
export default function RouteManager({
  component: Component,
  isPrivate,
  isError,
  path,
  exact,
}) {
  const signed = true;

  /** Redirect to error page */
  if (isError) {
    return <Route path={path} exact={exact} component={Component} />;
  }

  /** Redirect to toot if not signed and the page is private */
  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  /** Redirect to dashboard if signed and page is not private */
  if (signed && !isPrivate) {
    return <Redirect to="/dashboard" />;
  }

  /** Standard redirect */
  return <Route path={path} exact={exact} component={Component} />;
}

RouteManager.propTypes = {
  isPrivate: PropTypes.bool,
  isError: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool,
};

RouteManager.defaultProps = {
  isPrivate: false,
  isError: false,
  exact: false,
};
