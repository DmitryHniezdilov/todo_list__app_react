import React, {useState, useEffect, useCallback, useContext} from 'react';
import { Context } from "../../context";
import * as types from '../../reducer/actionTypes';
import {FormHelperText, FormControl, Button, Paper, Input} from '@material-ui/core';
import QueueIcon from '@material-ui/icons/Queue';
import SaveIcon from '@material-ui/icons/Save';
import {createTodoItem} from '../../utils';
import {useStyles} from './styles';

const ItemAddForm = () => {
    const classes = useStyles();
    const {dispatch, state} = useContext(Context);
    const {todoData, isEditable, editableId} = state;
    const [label, setLabel] = useState('');
    const [isError, setError] = useState(false);

    const minInputLength = 8;

    const item = todoData.find((el) => el.id === editableId);
    const editableValue = editableId && isEditable ? item.label : '';

    const onEditableSave = value => {
        const idx = todoData.findIndex((el) => el.id === editableId);
        const changeItemLabel = todoData[idx];
        changeItemLabel.label = value;
        const newArray = [
            ...todoData.slice(0, idx),
            changeItemLabel,
            ...todoData.slice(idx + 1)
        ];

        dispatch({type: types.SET_TODO_DATA, todoData: newArray});
        dispatch({type: types.SET_IS_EDITABLE, isEditable: false});
        dispatch({type: types.SET_EDITABLE_ID, editableId: null});
    };

    const onItemAdded = text => {
        const newItem = createTodoItem(text);
        const newArray = [
            ...todoData,
            newItem
        ];

        dispatch({type: types.SET_TODO_DATA, todoData: newArray});
    };

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
    };

    const isSubmitable = label.length >= minInputLength;

    const changeSubmit = isEditable ? onEditableHandler : onSubmit;

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
                    <FormHelperText id="standard-weight-helper-text" className={classes.helperText}>
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

export default ItemAddForm;
