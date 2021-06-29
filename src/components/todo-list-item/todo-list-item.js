import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Paper, Divider, IconButton, FormControl} from '@material-ui/core';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
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

  let classNames = 'todo-list-item';
  if (done) {
    classNames += ' done';
  }

  if (important) {
    classNames += ' important'
  }

  if (isEditable) {
    classNames += ' editable'
  }

  const notToggleDone = e => e.preventDefault();

  return (
    <Paper className={classNames}>
            <span
              className="todo-list-item__label"
              onClick={isEditable ? notToggleDone : onToggleDone}>
                {label}
            </span>
      <FormControl className={classes.formControl}>
        <IconButton disabled={isEditable} type="button" color="secondary" className={classes.iconButton}
                    aria-label="delete"
                    onClick={onDeleted}>
          <DeleteIcon/>
        </IconButton>
        <Divider className={classes.divider} orientation="vertical"/>
        <IconButton disabled={isEditable} type="button" color="primary" className={classes.iconButton}
                    aria-label="important"
                    onClick={onToggleImportant}>
          <NotificationImportantIcon/>
        </IconButton>
        <Divider className={classes.divider} orientation="vertical"/>
        <IconButton disabled={isEditable} type="button" className={classes.iconButton} aria-label="edit"
                    onClick={editeItem}>
          <EditIcon/>
        </IconButton>
      </FormControl>
    </Paper>
  );
};

export default TodoListItem;
