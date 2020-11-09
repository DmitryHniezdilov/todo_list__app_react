import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import QueueIcon from '@material-ui/icons/Queue';

import './item-add-form.scss';

const useStyles = theme => ({
    formControl: {
        flex: 1,
        paddingLeft: '1.25rem',
    },
    input: {
        marginRight: '1.25rem',
    },
    helperText: {
        color: '#f44336',
    }
});

class ItemAddForm extends Component {

    state = {
        label: '',
    };

    minInputLength = 8 ;

    onLabelChange = (e) => {
        const value = e.target.value;

        this.setState({
            label: e.target.value
        });

        if( value > this.minInputLength ){
            this.setState({
                toSubmit: 'onSubmit'
            });
        }

    };

    nonSubmit = (e) => {
        e.preventDefault();
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

            <Paper component="form" className="item-add-form__wrap"
                onSubmit={ (this.state.label.length >= this.minInputLength ) ? this.onSubmit : (e => { e.preventDefault(); })}>
                <FormControl className={classes.formControl}>
                    <Input
                        error={this.state.label.length && this.state.label.length < this.minInputLength}
                        className={classes.input}
                        placeholder="Enter new task"
                        label="Enter new task"
                        inputProps={{ 'aria-label': 'Enter new task' }}
                        onChange={this.onLabelChange}
                        value={this.state.label}
                        helperText="Incorrect entry."
                    />
                    <FormHelperText id="standard-weight-helper-text" className={classes.helperText}>
                        {(0 < this.state.label.length && this.state.label.length < this.minInputLength) ? 'Length is too short' : ''}
                    </FormHelperText>
                </FormControl>
                <Button className='item-add-form'
                    startIcon={<QueueIcon />}
                    onClick={this.onSubmit}
                    disabled={this.state.label.length < this.minInputLength}>
                    Add Item
                </Button>
            </Paper>
        );
    }
};

export default withStyles(useStyles)(ItemAddForm);
