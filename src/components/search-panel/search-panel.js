import React, {useState} from 'react';
import Input from '@material-ui/core/Input';
import {useStyles} from './styles';

const SearchPanel = ({onSearchChangeFunc}) => {
  const classes = useStyles();
  const [term, setTerm] = useState('');

  const onSearchChange = (e) => {
    const term = e.target.value;
    setTerm(term);
    onSearchChangeFunc(term);
  };

  return (
    <Input
      variant="outlined"
      className={classes.input}
      placeholder="Type to search"
      inputProps={{'aria-label': 'Type to search'}}
      value={term}
      onChange={onSearchChange}
    />
  );
};

export default SearchPanel;
