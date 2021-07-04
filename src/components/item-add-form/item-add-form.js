import React, {useState, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';
import {FormHelperText, FormControl, Button, Paper, Input} from '@material-ui/core';
import QueueIcon from '@material-ui/icons/Queue';
import SaveIcon from '@material-ui/icons/Save';
import {useStyles} from './styles';

const ItemAddForm = ({onItemAdded, onEditableSave, isEditable, editableValue}) => {
  const classes = useStyles();
  const [label, setLabel] = useState('');
  const [isError, setError] = useState(false);

  const minInputLength = 8;

  const nonSubmit = e => e.preventDefault();

  const onSubmit = e => {
    e.preventDefault();
    onItemAdded(label);
    setLabel('');
    setError(false);
  };

  const onEditableHandler = e => {
    e.preventDefault();
    onEditableSave(label);
  }

  useEffect(() => {
    const conditionError = 0 < label.length && label.length < minInputLength;
    conditionError ? setError(true) : setError(false);
  }, [label]);

  useEffect(() => {
    if (isEditable) {
      setLabel(editableValue)
    } else {
      setLabel('')
    }
  }, [isEditable, editableValue]);

  const isSubmitable = label.length >= minInputLength;

  const changeSubmit = isEditable ? onEditableHandler : onSubmit;

  return (
    <Paper component="form" className={classes.itemAddFormWrap}
           onSubmit={isSubmitable ? changeSubmit : nonSubmit}>
      <FormControl className={classes.formControl}>
        <Input
          error={isError}
          className={classes.input}
          placeholder='Enter new task'
          label={`Task '${label}'`}
          inputProps={{'aria-label': 'Enter new task'}}
          onChange={useCallback(e => setLabel(e.target.value), [])}
          value={label}
          helpertext="Incorrect entry."
        />
        {isError && (
          <FormHelperText id="standard-weight-helper-text" className={classes.helpertext}>
            Length is too short
          </FormHelperText>
        )}
      </FormControl>
      <Button
        startIcon={isEditable ? <SaveIcon/> : <QueueIcon/>}
        onClick={isEditable ? onEditableHandler : onSubmit}
        disabled={label.length < minInputLength}>
        {isEditable ? 'Save' : 'Add Item'}
      </Button>
    </Paper>
  );
};

ItemAddForm.propTypes = {
  onItemAdded: PropTypes.func,
  onEditableSave: PropTypes.func,
  isEditable: PropTypes.bool,
  editableValue: PropTypes.string
};

export default ItemAddForm;
