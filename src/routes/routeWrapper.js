import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { store } from '../store';
import NotFound from '../pages/notFound/_index';
import Helper from '../helpers/_index';

export default function RouteWrapper({
  component,
  isPrivate,
  template: Template,
  path,
  ...rest
}) {
  const { auth } = store.getState();

  try {
    if (!Helper.hasPermission(auth, path)) {
      return <Redirect to="/area-restrita" />;
    }

    if (auth && !auth.userLogged && isPrivate) {
      return <Redirect to="/" />;
    }

    if (auth && auth.userLogged && !isPrivate) {
      if (component === NotFound) {
        return <NotFound />;
      }
      return <Redirect to="/dashboard" />;
    }
    /* eslint-disable react/jsx-props-no-spreading */
    return (
      <Route
        {...rest}
        render={props => <Template {...props} component={component} />}
      />
    );
  } catch (e) {
    console.log(e);
  }
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
  template: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
};
RouteWrapper.defaultProps = {
  isPrivate: false,
};
