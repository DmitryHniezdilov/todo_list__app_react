import React from 'react';
import PropTypes from 'prop-types';
import {Button, ButtonGroup} from '@material-ui/core';
import {useStyles} from './styles';

const buttonsList = [
  {name: 'all', label: 'All'},
  {name: 'active', label: 'Active'},
  {name: 'done', label: 'Done'}
];

const ItemStatusFilter = ({filter, onFilterChange}) => {
  const classes = useStyles();

  const buttons = buttonsList.map(({name, label}) => {
    const isActive = filter === name;
    const variantActive = isActive ? 'contained' : '';
    const colorActive = isActive ? 'primary' : '';

    return (
      <Button
        key={name}
        onClick={() => onFilterChange(name)}
        variant={variantActive}
        color={colorActive}>
        {label}
      </Button>
    );
  });

  return (
    <ButtonGroup variant='outlined' aria-label="button group" className={classes.itemStatusFilter}>
      {buttons}
    </ButtonGroup>
  );
};

ItemStatusFilter.propTypes = {
  filter: PropTypes.func,
  onFilterChange: PropTypes.func,
};

export default ItemStatusFilter;