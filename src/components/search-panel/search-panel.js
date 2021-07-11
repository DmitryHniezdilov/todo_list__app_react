import React, {useCallback, useEffect, useState, useContext} from 'react';
import { Context } from "../../context";
import * as types from '../../reducer/actionTypes';
import Input from '@material-ui/core/Input';
import {useStyles} from './styles';

const SearchPanel = () => {
    const classes = useStyles();
    const {dispatch} = useContext(Context);
    const [term, setTerm] = useState('');

    useEffect(() => {
        dispatch({type: types.SET_TERM, term: term});
    }, [term, dispatch]);

    return (
        <Input
            variant="outlined"
            className={classes.input}
            placeholder="Type to search"
            inputProps={{'aria-label': 'Type to search'}}
            value={term}
            onChange={useCallback(e => setTerm(e.target.value), [])}
        />
    );
};

export default SearchPanel;
