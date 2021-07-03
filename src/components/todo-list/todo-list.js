import React from 'react';
import PropTypes from 'prop-types';
import TodoListItem from '../todo-list-item';
import {useStyles} from './styles';

const TodoList = ({
                    todos,
                    onDeleted,
                    onToggleImportant,
                    onToggleDone,
                    editeItem,
                    isEditable
                  }) => {

  const classes = useStyles();

  const elements = todos.map((item) => {
    const {id, ...itemProps} = item;

    return (
      <li key={id} className={classes.listGroupItem}>
        <TodoListItem
          {...itemProps}
          onDeleted={() => onDeleted(id)}
          onToggleImportant={() => onToggleImportant(id)}
          onToggleDone={() => onToggleDone(id)}
          editeItem={() => editeItem(id)}
          isEditable={isEditable}
        />
      </li>
    );
  });

  return (
    <ul className={classes.todoList}>
      {elements}
    </ul>
  );
};

TodoList.propTypes = {
  todos: PropTypes.array,
  onDeleted: PropTypes.func,
  onToggleImportant: PropTypes.func,
  onToggleDone: PropTypes.func,
  editeItem: PropTypes.func,
  isEditable: PropTypes.bool,
};

export default TodoList;
