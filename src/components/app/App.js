import React, {useContext, useEffect} from 'react';
import {Context} from '../../context';
import {Grid, Card, CardContent} from '@material-ui/core';
import AppTitle from '../app-title/';
import AppStatus from '../app-status/';
import SearchPanel from '../search-panel/';
import ItemStatusFilter from '../item-status-filter/';
import TodoList from '../todo-list/';
import ItemAddForm from '../item-add-form/';
import {localStorageHelper} from '../../utils';
import {useStyles} from './styles';

const App = () => {
    const classes = useStyles();
    const {state} = useContext(Context);
    const {todoData} = state;

    useEffect(() => {
        localStorageHelper.store(todoData)
    }, [todoData]);

    return (
        <Grid container justify="center" alignItems="center" className={classes.root}>
            <Grid item xs={8} component="main" className={classes.item}>
                <Card className={classes.card} variant="outlined">
                    <CardContent className={classes.appTopWrap}>
                        <AppTitle/>
                        <AppStatus/>
                        <SearchPanel/>
                        <ItemStatusFilter/>
                    </CardContent>
                    <CardContent>
                        <TodoList/>
                        <ItemAddForm/>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default App;
