import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Grid, Card, CardContent} from '@material-ui/core';
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
      this.createTodoItem('Make Awesome App')
    ],
    term: '',
    filter: 'all',
    isEditable: false,
    editableId: null
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: new Date().valueOf()
    }
  }

  onEditableSave = value => {
    this.setState(({todoData, isEditable, editableId}) => {
      const idx = todoData.findIndex((el) => el.id === this.state.editableId);
      const changeItemLabel = todoData[idx];
      changeItemLabel.label = value;
      const newArray = [
        ...todoData.slice(0, idx),
        changeItemLabel,
        ...todoData.slice(idx + 1)
      ];

      return {
        todoData: newArray,
        isEditable: false,
        editableId: null
      };
    })
  }

  editeItem = id => {
    let {todoData} = this.state;
    const idx = todoData.findIndex((el) => el.id === id);

    this.setState({
      isEditable: true,
      editableId: todoData[idx].id
    });
  }

  deleteItem = id => {
    this.setState(({todoData}) => {
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

  addItem = text => {
    const newItem = this.createTodoItem(text);

    this.setState(({todoData}) => {
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
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      };
    });
  };

  onToggleImportant = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      };
    });
  };

  onSearchChange = (term) => {
    this.setState({term});
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
    this.setState({filter});
  }

  toLocalStorage = () => {
    let {todoData} = this.state;
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
      this.setState(({todoData}) => {
        return {
          todoData: ArrayFromLocalStorage
        };
      });
    }
    ;
  }

  render() {

    const {classes} = this.props;

    const {todoData, term, filter, isEditable, editableId} = this.state;

    const visibleItems = this.filter(
      this.search(todoData, term), filter);

    const doneCount = todoData
      .filter((el) => el.done).length;

    const todoCount = todoData.length - doneCount;

    let editableValue = '';

    if (editableId && isEditable) {
      const item = todoData.find((el) => el.id === editableId);
      editableValue = item.label;
    }

    return (
      <Grid container justify="center" alignItems="center" className={classes.root}>
        <Grid item xs={8} component="main" className={classes.item}>
          <Card className={classes.card} variant="outlined">
            <CardContent className="app__top-wrap">
              <AppTitle/>
              <AppStatus
                toDo={todoCount} done={doneCount}/>
              <SearchPanel
                onSearchChangeFunc={this.onSearchChange}/>
              <ItemStatusFilter
                filter={filter}
                onFilterChange={this.onFilterChange}/>
            </CardContent>
            <CardContent className="">
              <TodoList
                todos={visibleItems}
                onDeleted={this.deleteItem}
                onToggleImportant={this.onToggleImportant}
                onToggleDone={this.onToggleDone}
                editeItem={this.editeItem}
                isEditable={this.state.isEditable}/>
              <ItemAddForm
                onItemAdded={this.addItem}
                onEditableSave={this.onEditableSave}
                isEditable={this.state.isEditable}
                editableValue={editableValue}/>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
};

export default withStyles(useStyles)(App);
