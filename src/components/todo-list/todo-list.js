import React from 'react';
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

export default TodoList;
