import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component {

    buttons = [
        { name: 'all', label: 'All' },
        { name: 'active', label: 'Active' },
        { name: 'done', label: 'Done' }
    ];

    render() {

        const { filter, onFilterChange } = this.props;

        const buttons = this.buttons.map(({ name, label }) => {
          const isActive = filter === name;
          const variantActive = isActive ? 'contained' : '';
          const colorActive = isActive ? 'primary' : '';

          return (
            <Button
            key={name}
            onClick={() => onFilterChange(name)}
            variant={variantActive}
            color={colorActive} >
                {label}
            </Button>
          );
        });

        return (
            <ButtonGroup variant='outlined' aria-label="button group" className='item-status-filter'>
                {buttons}
            </ButtonGroup>
        );
    };
};
