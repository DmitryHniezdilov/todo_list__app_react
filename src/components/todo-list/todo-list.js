import React, {useContext} from 'react';
import { Context } from "../../context";
import TodoListItem from '../todo-list-item';
import { useStyles } from './styles';

const TodoList = () => {
    const classes = useStyles();
    const {state} = useContext(Context);
    const {todoData, term, filter} = state;

    const search = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter((item) => {
            return item.label.toLowerCase().indexOf(term) > -1;
        });
    };

    const filterCondition = (items, filter) => {
        switch (filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter((item) => !item.done);
            case 'done':
                return items.filter((item) => item.done);
            default:
                return items;
        }
    };

    const visibleItems = filterCondition(search(todoData, term), filter);

    const elements = visibleItems.map((item) => {
        const { id, ...itemProps } = item;

        return (
            <li key={id} className={classes.listGroupItem}>
                <TodoListItem
                    {...itemProps}
                    id={id}
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
