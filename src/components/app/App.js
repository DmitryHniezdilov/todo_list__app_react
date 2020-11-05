import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import AppTitle from '../app-title/';
import AppStatus from '../app-status/';
import SearchPanel from '../search-panel/';
import ItemStatusFilter from '../item-status-filter/';
import TodoList from '../todo-list/';
import ItemAddForm from '../item-add-form/';
import './App.scss';

const useStyles = theme => ({
  root: {
    height: '100vh',
  },
  item: {
    maxWidth: '470px',
  },
  card: {
    height: '100%',
    width: '100%',
  },
});

class App extends Component {

  startId = 1;

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Learn Redux'),
      this.createTodoItem('Make Awesome App')
    ],
    term: '',
    filter: 'all'
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.startId++
    }
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const newArray = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1)
      ];

      return {
        todoData: newArray
      };
    })
  }

  addItem = (text) => {
    const newItem = this.createTodoItem(text);

    this.setState(({ todoData }) => {
      const newArr = [
        ...todoData,
        newItem
      ];

      return {
        todoData: newArr
      };
    });
  };

  toggleProperty(arr, id, propName) {
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

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      };
    });
  };

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      };
    });
  };

  onSearchChange = (term) => {
    this.setState({ term });
  };

  search(items, term) {
    if (term.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(term) > -1;
    });
  }

  filter(items, filter) {
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

  onFilterChange = (filter) => {
    this.setState({ filter });
  }

  toLocalStorage = () => {
    let { todoData } = this.state;
    localStorage.setItem('todoData', JSON.stringify(todoData));
  };

  componentDidUpdate(prevState) {
    if (this.state !== prevState) {
      this.toLocalStorage();
    }
  }

  componentDidMount() {
    const ArrayFromLocalStorage = JSON.parse(localStorage.getItem("todoData"));
    if (null !== ArrayFromLocalStorage) {
      this.setState(({ todoData }) => {
        return {
          todoData: ArrayFromLocalStorage
        };
      });
    };
  }

  render() {

    const { classes } = this.props;

    const { todoData, term, filter } = this.state;

    const visibleItems = this.filter(
      this.search(todoData, term), filter);

    const doneCount = todoData
      .filter((el) => el.done).length;

    const todoCount = todoData.length - doneCount;

    return (
      <Grid container justify="center" alignItems="center" className={classes.root}>
        <Grid item xs={8} component="main" className={classes.item}>
          <Card className={classes.card} variant="outlined">
            <CardContent className="app__top-wrap">
              <AppTitle />
              <AppStatus
                toDo={todoCount} done={doneCount} />
              <SearchPanel
                onSearchChange={this.onSearchChange} />
              <ItemStatusFilter
                filter={filter}
                onFilterChange={this.onFilterChange} />
            </CardContent>
            <CardContent className="">
              <TodoList
                todos={visibleItems}
                onDeleted={this.deleteItem}
                onToggleImportant={this.onToggleImportant}
                onToggleDone={this.onToggleDone} />
              <ItemAddForm
                onItemAdded={this.addItem} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
};

export default withStyles(useStyles)(App);
