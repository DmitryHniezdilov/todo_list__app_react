import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FormControl from '@material-ui/core/FormControl';

import './todo-list-item.scss';

const useStyles = makeStyles((theme) => ({

    iconButton: {
        padding: 10,
    },

    divider: {
        height: 28,
        margin: 4,
    },
    formControl: {
        flexDirection: "row",
    }

}));

const TodoListItem = ({ label,
    onDeleted,
    onToggleImportant,
    onToggleDone,
    important,
    done }) => {

    const classes = useStyles();

    let classNames = 'todo-list-item';
    if (done) {
        classNames += ' done';
    }

    if (important) {
        classNames += ' important'
    }

    return (
        <Paper className={classNames}>
            <span
                className="todo-list-item__label"
                onClick={onToggleDone}>
                {label}
            </span>
            <FormControl className={classes.formControl}>
                <IconButton type="button" color="secondary" className={classes.iconButton} aria-label="delete"
                    onClick={onDeleted}>
                    <DeleteIcon />
                </IconButton>
                <Divider className={classes.divider} orientation="vertical" />
                <IconButton type="button" color="primary" className={classes.iconButton} aria-label="important"
                    onClick={onToggleImportant}>
                    <NotificationImportantIcon />
                </IconButton>
                <Divider className={classes.divider} orientation="vertical" />
                <IconButton type="button" color="action.active" className={classes.iconButton} aria-label="important">
                    <EditIcon />
                </IconButton>
            </FormControl>
        </Paper>
    );
};

export default TodoListItem;
