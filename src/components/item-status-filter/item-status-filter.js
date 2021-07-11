import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {Button, ButtonGroup} from '@material-ui/core';
import { Context } from "../../context";
import * as types from '../../reducer/actionTypes';
import {useStyles} from './styles';

const buttonsList = [
    {name: 'all', label: 'All'},
    {name: 'active', label: 'Active'},
    {name: 'done', label: 'Done'}
];

const ItemStatusFilter = ({filter, onFilterChange}) => {
    const classes = useStyles();

    // useContext

    const [dispatch] = useContext(Context);

    // end useContext

    const buttons = buttonsList.map(({name, label}) => {
        const isActive = filter === name;
        const variantActive = isActive ? 'contained' : '';
        const colorActive = isActive ? 'primary' : '';
        const clickBtn = () => {
            onFilterChange(name);
            dispatch({type: types.SET_FILTER_VALUE, filterValue: name})
        };

        return (
            <Button
                key={name}
                onClick={clickBtn}
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
    filter: PropTypes.string,
    onFilterChange: PropTypes.func
};

export default ItemStatusFilter;
