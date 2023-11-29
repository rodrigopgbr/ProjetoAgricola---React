/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import clsx from 'clsx';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import Helper from '../../helpers/_index';

export default function InputSelect(props) {
  const {
    id,
    label,
    onChange,
    onChangeSimple,
    onChangeId,
    name,
    errors,
    value,
    typeSelect,
    options,
    defaultKey,
    selectNoneLabel,
    returnString,
  } = props;

  const handleChange = text => {
    if (onChangeSimple) {
      onChangeSimple(text);
    } else if (onChangeId) {
      onChangeId(id, name, text);
    } else {
      onChange(name, text);
    }
  };

  const isError = () => {
    if (errors && errors[name]) {
      return true;
    }
    return false;
  };

  const HelperError = () => {
    return isError() && <FormHelperText>{errors[name]}</FormHelperText>;
  };

  const getOptionValue = () => {
    if (value) {
      const obj = options.find(opt => opt.id == value);
      if (obj) {
        return obj;
      }
    }
    return null;
  };

  function SelectBasic() {
    const idLabel = Helper.generateKey('label', 5);
    return (
      <>
        <InputLabel id={idLabel}>{label}</InputLabel>
        <Select
          labelId={idLabel}
          id={Helper.generateKey('opt', 5)}
          value={value || defaultKey || ''}
          onChange={text => handleChange(text.target.value)}
          label={label}
        >
          {selectNoneLabel && (
            <MenuItem value="">
              <em>{selectNoneLabel}</em>
            </MenuItem>
          )}
          {options &&
            options.map(item => (
              <MenuItem key={Helper.generateKey('opt', 5)} value={item.id}>
                {item.title}
              </MenuItem>
            ))}
        </Select>
        <HelperError />
      </>
    );
  }

  function SelectSearch() {
    return (
      <Autocomplete
        id={Helper.generateKey('opt', 5)}
        onChange={(event, newValue) => {
          handleChange((newValue && newValue.id) || '');
        }}
        value={getOptionValue()}
        options={options}
        getOptionLabel={option => option.title}
        style={{ width: '100%' }}
        renderInput={params => (
          <TextField {...params} label={label} variant="outlined" />
        )}
      />
    );
  }

  function getSelect() {
    switch (typeSelect) {
      case 'search':
        return SelectSearch();

      case 'basic':
      default:
        return SelectBasic();
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

InputSelect.propTypes = {
  id: PropTypes.string,
  typeSelect: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  defaultKey: PropTypes.number,
  selectNoneLabel: PropTypes.string,
  errors: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  options: PropTypes.oneOfType([PropTypes.array]),
  name: PropTypes.string.isRequired,
  onChange: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  onChangeSimple: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  onChangeId: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  returnString: PropTypes.bool,
};

InputSelect.defaultProps = {
  id: '',
  typeSelect: null,
  label: '',
  value: null,
  errors: {},
  options: [],
  defaultKey: null,
  selectNoneLabel: null,
  onChange: null,
  onChangeSimple: null,
  onChangeId: null,
  returnString: false,
};
