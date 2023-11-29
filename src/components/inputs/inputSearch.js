/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import clsx from 'clsx';
import FormHelperText from '@material-ui/core/FormHelperText';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import IconSearch from '@material-ui/icons/Search';

export default function InputSearch(props) {
  const {
    label,
    onChange,
    onChangeSimple,
    name,
    errors,
    value,
    typeSearch,
    innerRef,
    handleSearch,
  } = props;

  const isError = () => {
    if (errors && errors[name]) {
      return true;
    }
    return false;
  };

  const HelperError = () => {
    return isError() && <FormHelperText>{errors[name]}</FormHelperText>;
  };

  const handleChange = text => {
    if (onChangeSimple) {
      onChangeSimple(text.target.value);
    } else {
      onChange(name, text.target.value);
    }
  };

  function SearchBasic() {
    return (
      <>
        <InputLabel htmlFor={name}>{label}</InputLabel>
        <OutlinedInput
          label={label}
          name={name}
          value={value || ''}
          inputRef={innerRef}
          onChange={text => handleChange(text)}
          autoComplete="off"
          data-lpignore="true"
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={() => handleSearch(value || '')}>
                <IconSearch />
              </IconButton>
            </InputAdornment>
          }
        />
        <HelperError />
      </>
    );
  }

  function getSelect() {
    switch (typeSearch) {
      case 'basic':
      default:
        return SearchBasic();
    }
  }

  return (
    <FormControl
      className={clsx('fullWidth', isError() && 'MuiErrorMask')}
      variant="outlined"
      error={isError()}
      autoComplete="off"
    >
      {getSelect()}
    </FormControl>
  );
}

InputSearch.propTypes = {
  typeSearch: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  errors: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  innerRef: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  name: PropTypes.string.isRequired,
  onChange: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  onChangeSimple: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  handleSearch: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
};

InputSearch.defaultProps = {
  typeSearch: null,
  label: '',
  value: null,
  errors: {},
  innerRef: null,
  handleSearch: null,
  onChange: null,
  onChangeSimple: null,
};
