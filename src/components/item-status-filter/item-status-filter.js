import React, {useContext} from 'react';
import { Context } from "../../context";
import * as types from '../../reducer/actionTypes';
import {Button, ButtonGroup} from '@material-ui/core';
import {useStyles} from './styles';

const buttonsList = [
    {name: 'all', label: 'All'},
    {name: 'active', label: 'Active'},
    {name: 'done', label: 'Done'}
];

const ItemStatusFilter = () => {
    const classes = useStyles();
    const {dispatch, state} = useContext(Context);
    const {filter} = state;

    const buttons = buttonsList.map(({name, label}) => {
        const isActive = filter === name;
        const variantActive = isActive ? 'contained' : '';
        const colorActive = isActive ? 'primary' : '';

        const onFilterChange = () => {
            dispatch({type: types.SET_FILTER_VALUE, filterValue: name});
        };

        return (
            <Button
                key={name}
                onClick={onFilterChange}
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

export default ItemStatusFilter;
