import React from 'react';
import PropTypes from 'prop-types';
import { Content, Title } from './styles';

export default function ContentPage(props) {
  const { title, children } = props;

  return (
    <div>
      <Title>{title}</Title>
      <Content elevation={1}>{children}</Content>
    </div>
  );
}

ContentPage.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
};

ContentPage.defaultProps = {
  title: '',
};
