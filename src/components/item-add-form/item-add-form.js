import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import QueueIcon from '@material-ui/icons/Queue';

import './item-add-form.css';

const useStyles = theme => ({
    root: {
        padding: '6px 4px',
        display: 'flex',
        alignItems: 'center',
    },
    input: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        flex: 1,
    },
});

class ItemAddForm extends Component {

    state = {
        label: ''
    };

    onLabelChange = (e) => {
        this.setState({
            label: e.target.value
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onItemAdded(this.state.label);
        this.setState({
            label: ''
        });
    };

    render() {

        const { classes } = this.props;

        return (

            <Paper component="form" className={classes.root}
                onSubmit={this.onSubmit}>
                <InputBase
                    className={classes.input}
                    placeholder="Enter new task"
                    inputProps={{ 'aria-label': 'Enter new task' }}
                    onChange={this.onLabelChange}
                    value={this.state.label}
                />
                <Button className='item-add-form'
                    startIcon={<QueueIcon />}
                    onClick={this.onSubmit}>
                    Add Item
                </Button>
            </Paper>
        );
    }
};

export default withStyles(useStyles)(ItemAddForm);
