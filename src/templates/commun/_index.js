import React from 'react';
import PropTypes from 'prop-types';

export default function TemplateCommum(props) {
  const { component: Component } = props;

  return <Component />;
}

TemplateCommum.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};
