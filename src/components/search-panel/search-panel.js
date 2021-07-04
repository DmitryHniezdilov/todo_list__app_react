import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import {useStyles} from './styles';

const SearchPanel = ({onSearchChangeFunc}) => {
    const classes = useStyles();
    const [term, setTerm] = useState('');

    useEffect(() => {
        onSearchChangeFunc(term)
    }, [term, onSearchChangeFunc]);

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

SearchPanel.propTypes = {
    onSearchChangeFunc: PropTypes.func
};

export default SearchPanel;
