import React, {useState, useEffect} from 'react';
import {Grid, Card, CardContent} from '@material-ui/core';
import AppTitle from '../app-title/';
import AppStatus from '../app-status/';
import SearchPanel from '../search-panel/';
import ItemStatusFilter from '../item-status-filter/';
import TodoList from '../todo-list/';
import ItemAddForm from '../item-add-form/';
import {useStyles} from './styles';

const App = () => {
  const classes = useStyles();

  const createTodoItem = label => {
    return {
      label,
      important: false,
      done: false,
      id: new Date().valueOf()
    }
  }

  const initialTodoData = () => JSON.parse(window.localStorage.getItem("todoData")) || [createTodoItem('Make Awesome App')];

  const [todoData, setTodoData] = useState(initialTodoData);
  const [term, setTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [isEditable, setIsEditable] = useState(false);
  const [editableId, setEditableId] = useState(null);


  const onEditableSave = value => {
    const idx = todoData.findIndex((el) => el.id === editableId);
    const changeItemLabel = todoData[idx];
    changeItemLabel.label = value;
    const newArray = [
      ...todoData.slice(0, idx),
      changeItemLabel,
      ...todoData.slice(idx + 1)
    ];

    setTodoData(newArray);
    setIsEditable(false);
    setEditableId(null);
  }

  const editeItem = id => {
    const idx = todoData.findIndex((el) => el.id === id);

    setIsEditable(true);
    setEditableId(todoData[idx].id)
  };

  const deleteItem = id => {
    const idx = todoData.findIndex((el) => el.id === id);

    const newArray = [
      ...todoData.slice(0, idx),
      ...todoData.slice(idx + 1)
    ];

    setTodoData(newArray);
  }

  const addItem = text => {
    const newItem = createTodoItem(text);
    const newArray = [
      ...todoData,
      newItem
    ];

    setTodoData(newArray);
  };

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
  }

  const onToggleDone = id => {
    const toggleDone = toggleProperty(todoData, id, 'done');
    setTodoData(toggleDone);
  };

  const onToggleImportant = id => {
    const toggleImportant = toggleProperty(todoData, id, 'important');
    setTodoData(toggleImportant);
  };

  const onSearchChange = term => {
    setTerm(term);
  };

  const search = (items, term) => {
    if (term.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(term) > -1;
    });
  }

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
  }

  const onFilterChange = filterValue => {
    setFilter(filterValue);
  }

  const visibleItems = filterCondition(
    search(todoData, term), filter);

  const doneCount = todoData
    .filter((el) => el.done).length;

  const todoCount = todoData.length - doneCount;

  let editableValue = '';

  if (editableId && isEditable) {
    const item = todoData.find((el) => el.id === editableId);
    editableValue = item.label;
  }

  useEffect(() => {
    window.localStorage.setItem('todoData', JSON.stringify(todoData));
  }, [todoData]);

  return (
    <Grid container justify="center" alignItems="center" className={classes.root}>
      <Grid item xs={8} component="main" className={classes.item}>
        <Card className={classes.card} variant="outlined">
          <CardContent className={classes.appTopWrap}>
            <AppTitle/>
            <AppStatus
              toDo={todoCount} done={doneCount}/>
            <SearchPanel
              onSearchChangeFunc={onSearchChange}/>
            <ItemStatusFilter
              filter={filter}
              onFilterChange={onFilterChange}/>
          </CardContent>
          <CardContent className="">
            <TodoList
              todos={visibleItems}
              onDeleted={deleteItem}
              onToggleImportant={onToggleImportant}
              onToggleDone={onToggleDone}
              editeItem={editeItem}
              isEditable={isEditable}/>
            <ItemAddForm
              onItemAdded={addItem}
              onEditableSave={onEditableSave}
              isEditable={isEditable}
              editableValue={editableValue}/>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default App;
