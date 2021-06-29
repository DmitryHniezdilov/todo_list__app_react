import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import './search-panel.css';

const useStyles = theme => ({
  input: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: '1px',
  },
});

class SearchPanel extends Component {

  state = {
    term: ''
  }

  onSearchChange = (e) => {
    const term = e.target.value;
    this.setState({term});
    this.props.onSearchChange(term);
  };

  render() {

    const {classes} = this.props;

    return (
      <Input
        variant="outlined"
        className={classes.input}
        placeholder="Type to search"
        inputProps={{'aria-label': 'Type to search'}}
        value={this.state.term}
        onChange={this.onSearchChange}
      />
    );
  };
};

export default withStyles(useStyles)(SearchPanel);
