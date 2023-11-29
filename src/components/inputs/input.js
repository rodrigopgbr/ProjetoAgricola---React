/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import clsx from 'clsx';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputMask from 'react-input-mask';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import DateFnsUtils from '@date-io/date-fns';
import NumberFormat from 'react-number-format';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import Clear from '@material-ui/icons/Clear';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Helper from '../../helpers/_index';

export default function Input(props) {
  const [showPassword, setShowPassword] = React.useState(false);

  const {
    id,
    label,
    onChange,
    name,
    innerRef,
    errors,
    mask,
    value,
    typeInput,
    onChangeSimple,
    onChangeId,
    type,
    disabled,
  } = props;

  const setDate = date => {
    const dt = new Date(date);
    if (onChangeSimple) {
      onChangeSimple(dt.toDateString());
    } else {
      onChange(name, dt.toDateString());
    }
  };

  const getDate = date => {
    try {
      if (date == null) {
        return null;
      }
      const dt = new Date(date);
      if (dt == 'Invalid Date') {
        return null;
      }
      return dt;
    } catch (e) {
      return new Date();
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

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handleChange = text => {
    if (onChangeSimple) {
      onChangeSimple(text.target.value);
    } else if (onChangeId) {
      onChangeId(id, name, text.target.value);
    } else {
      onChange(name, text.target.value);
    }
  };

  const handleChangeFile = text => {
    if (text && text.target.files) {
      if (onChangeSimple) {
        onChangeSimple(text.target.files[0]);
      } else if (onChangeId) {
        onChangeId(id, name, text.target.files[0]);
      } else {
        onChange(name, text.target.files[0]);
      }
    }
  };

  const handleChangeMoney = text => {
    if (onChangeSimple) {
      onChangeSimple(text.value);
    } else {
      onChange(name, text.value);
    }
  };

  const handleClearFile = () => {
    if (onChangeSimple) {
      onChangeSimple(null);
    } else if (onChangeId) {
      onChangeId(id, name, null);
    } else {
      onChange(name, null);
    }
  };

  // inputs

  function InputBasic() {
    return (
      <>
        <InputLabel htmlFor={name}>{label}</InputLabel>
        <OutlinedInput
          label={label}
          name={name}
          value={value || ''}
          type={type}
          inputRef={innerRef}
          onChange={text => handleChange(text)}
          autoComplete="off"
        />
        <HelperError />
      </>
    );
  }

  function InputPassword() {
    return (
      typeInput === 'password' && (
        <>
          <InputLabel htmlFor={name}>{label}</InputLabel>
          <OutlinedInput
            label={label}
            name={name}
            value={value || ''}
            type={showPassword ? 'text' : 'password'}
            inputRef={innerRef}
            onChange={text => handleChange(text)}
            autoComplete={showPassword ? 'off' : 'new-password'}
            data-lpignore="true"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          <HelperError />
        </>
      )
    );
  }

  function InputMasks() {
    return (
      <>
        <InputMask
          mask={mask}
          value={value || ''}
          className="fullWidth"
          variant="outlined"
          autoComplete="off"
          onChange={text => handleChange(text)}
        >
          {inputProps => (
            <TextField
              {...inputProps}
              inputRef={innerRef}
              fullWidth
              label={label}
            />
          )}
        </InputMask>
        <HelperError />
      </>
    );
  }

  function InputDatePicker() {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          autoOk
          autoComplete="off"
          inputRef={innerRef}
          label={label}
          inputVariant="outlined"
          placeholder="00/00/0000"
          value={getDate(value)}
          onChange={date => setDate(date)}
          format="dd/MM/yyyy"
          invalidDateMessage="Data Inválida"
          minDateMessage="Data minima inválida"
        />
        <HelperError />
      </MuiPickersUtilsProvider>
    );
  }

  function InputMoney() {
    return (
      <>
        <NumberFormat
          value={value || ''}
          autoComplete="off"
          label={label}
          name={name}
          variant="outlined"
          onValueChange={text => handleChangeMoney(text)}
          inputRef={innerRef}
          customInput={TextField}
          thousandSeparator
          format={Helper.formateReal}
        />
        <HelperError />
      </>
    );
  }

  function InputFile() {
    return (
      <>
        <InputLabel htmlFor={name}>{label}</InputLabel>
        <OutlinedInput
          label={label}
          name={name}
          value={value ? value.name : ''}
          inputRef={innerRef}
          autoComplete="off"
          data-lpignore="true"
          readOnly
          endAdornment={
            value ? (
              <InputAdornment position="end">
                <IconButton onClick={() => handleClearFile()}>
                  <Clear />
                </IconButton>
              </InputAdornment>
            ) : (
              <InputAdornment position="end">
                <input
                  accept="image/jpeg"
                  onChange={f => handleChangeFile(f)}
                  id="contained-button-file"
                  type="file"
                  style={{ display: 'none' }}
                />
                <label htmlFor="contained-button-file">
                  <AddPhotoAlternateIcon />
                </label>
              </InputAdornment>
            )
          }
        />
        <HelperError />
      </>
    );
  }

  function getInput() {
    switch (typeInput) {
      case 'mask':
        return InputMasks();

      case 'password':
        return InputPassword();

      case 'date':
        return InputDatePicker();

      case 'money':
        return InputMoney();

      case 'file':
        return InputFile();

      case 'text':
      default:
        return InputBasic();
    }
  }

  return (
    <FormControl
      className={clsx('fullWidth', isError() && 'MuiErrorMask')}
      variant="outlined"
      error={isError()}
      autoComplete="off"
      disabled={!!disabled}
    >
      {getInput()}
    </FormControl>
  );
}

Input.propTypes = {
  id: PropTypes.string,
  typeInput: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  mask: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  innerRef: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  errors: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  name: PropTypes.string.isRequired,
  onChangeSimple: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  onChange: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  onChangeId: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  disabled: PropTypes.bool,
};

Input.defaultProps = {
  id: null,
  typeInput: null,
  label: '',
  value: null,
  mask: null,
  innerRef: null,
  errors: {},
  onChange: null,
  onChangeSimple: null,
  type: '',
  onChangeId: null,
  disabled: false,
};
