import React from 'react';

import TodoListItem from '../todo-list-item';
import './todo-list.css';

const TodoList = ({
  todos,
  onDeleted,
  onToggleImportant,
  onToggleDone,
  editeItem,
  isEditable }) => {

  const elements = todos.map((item) => {
    const { id, ...itemProps } = item;

    return (
      <li key={id} className="list-group-item">
        <TodoListItem
          {...itemProps}
          onDeleted={() => onDeleted(id)}
          onToggleImportant={() => onToggleImportant(id)}
          onToggleDone={() => onToggleDone(id)}
          editeItem={() => editeItem(id)}
          isEditable={ isEditable }
          />
      </li>
    );
  });

  return (
    <ul className="todo-list">
      { elements}
    </ul>
  );
};

export default TodoList;
