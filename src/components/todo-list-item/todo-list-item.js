import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Divider, IconButton, FormControl } from '@material-ui/core';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import TodoListItemLabel from '../todo-list-item-label'
import { useStyles } from './styles';

const TodoListItem = ({
    label,
    onDeleted,
    onToggleImportant,
    onToggleDone,
    important,
    done,
    editeItem,
    isEditable
}) => {

    const classes = useStyles();

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

    const notToggleDone = e => e.preventDefault();

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
                    onClick={onDeleted}>
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
    label: PropTypes.string,
    onDeleted: PropTypes.func,
    onToggleImportant: PropTypes.func,
    onToggleDone: PropTypes.func,
    important: PropTypes.bool,
    done: PropTypes.bool,
    editeItem: PropTypes.func,
    isEditable: PropTypes.bool,
};

export default TodoListItem;
