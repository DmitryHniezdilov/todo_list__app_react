import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import { Context } from "../../context";
import * as types from '../../reducer/actionTypes';
import { Paper, Divider, IconButton, FormControl } from '@material-ui/core';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import TodoListItemLabel from '../todo-list-item-label';
import { useStyles } from './styles';

const TodoListItem = ({id, label, important, done}) => {
    const classes = useStyles();
    const {dispatch, state} = useContext(Context);
    const {todoData, isEditable} = state;

    let labelDone = '';
    let labelImportant = '';
    let labelEditable = '';

    if (done) {
        labelDone += 'true';
    }
    if (important) {
        labelImportant += 'true';
    }
    if (isEditable) {
        labelEditable += 'true'
    }

    const toggleProperty = (arr, id, propName) => {
        const idx = arr.findIndex((el) => el.id === id);

        const oldItem = arr[idx];
        const newItem = {
            ...oldItem,
            [propName]: !oldItem[propName]
        };

        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ];
    };

    const onToggleDone = () => {
        const toggleDone = toggleProperty(todoData, id, 'done');
        dispatch({type: types.SET_TODO_DATA, todoData: toggleDone});
    };

    const onToggleImportant = () => {
        const toggleImportant = toggleProperty(todoData, id, 'important');
        dispatch({type: types.SET_TODO_DATA, todoData: toggleImportant});
    };

    const notToggleDone = e => e.preventDefault();

    const onDeleteItem = () => {
        const idx = todoData.findIndex((el) => el.id === id);

        const newArray = [
            ...todoData.slice(0, idx),
            ...todoData.slice(idx + 1)
        ];

        dispatch({type: types.SET_TODO_DATA, todoData: newArray});
    };

    const editeItem = () => {
        const idx = todoData.findIndex((el) => el.id === id);

        dispatch({type: types.SET_IS_EDITABLE, isEditable: true});
        dispatch({type: types.SET_EDITABLE_ID, editableId: todoData[idx].id});
    };

    return (
        <Paper className={classes.todoListItem}>
            <TodoListItemLabel
                labelDone={labelDone}
                labelImportant={labelImportant}
                labelEditable={labelEditable}
                clickItemLabel={isEditable ? notToggleDone : onToggleDone}
                label={label}
            />
            <FormControl className={classes.formControl}>
                <IconButton disabled={isEditable} type="button" color="secondary" className={classes.iconButton}
                    aria-label="delete"
                    onClick={onDeleteItem}>
                    <DeleteIcon />
                </IconButton>
                <Divider className={classes.divider} orientation="vertical" />
                <IconButton disabled={isEditable} type="button" color="primary" className={classes.iconButton}
                    aria-label="important"
                    onClick={onToggleImportant}>
                    <NotificationImportantIcon />
                </IconButton>
                <Divider className={classes.divider} orientation="vertical" />
                <IconButton disabled={isEditable} type="button" className={classes.iconButton} aria-label="edit"
                    onClick={editeItem}>
                    <EditIcon />
                </IconButton>
            </FormControl>
        </Paper>
    );
};

TodoListItem.propTypes = {
    id: PropTypes.number,
    label: PropTypes.string,
    important: PropTypes.bool,
    done: PropTypes.bool
};

export default TodoListItem;
