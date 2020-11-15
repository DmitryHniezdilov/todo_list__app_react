import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import Formhelpertext from '@material-ui/core/Formhelpertext';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import QueueIcon from '@material-ui/icons/Queue';
import SaveIcon from '@material-ui/icons/Save';

import './item-add-form.scss';

const useStyles = theme => ({
    formControl: {
        flex: 1,
        paddingLeft: '1.25rem',
    },
    input: {
        marginRight: '1.25rem',
    },
    helpertext: {
        color: '#f44336',
    }
});

class ItemAddForm extends Component {
    state = {
        label: '',
        isError: false,
    };

    minInputLength = 8;

    onLabelChange = e => {
        this.setState({
            label: e.target.value
        });

        this.setState({
            isError: 0 < e.target.value.length && e.target.value.length < this.minInputLength
        });
    };

    nonSubmit = e => e.preventDefault();

    onSubmit = e => {
        e.preventDefault();
        this.props.onItemAdded(this.state.label);

        this.setState({
            label: ''
        });
    };

    onEditableHandler = e => {
        e.preventDefault();
        const { onEditableSave } = this.props;
        const { label } = this.state;
        onEditableSave(label);
    }

    componentDidUpdate(prevProps) {
        if (this.props.isEditable !== prevProps.isEditable) {
            this.props.isEditable ? this.setState({ label: this.props.editableValue }) : this.setState({ label: '' });
        };
    };

    render() {
        const { classes, isEditable } = this.props;
        const { label, isError } = this.state;

        const isSubmitable = label.length >= this.minInputLength;

        const changeSubmit = isEditable ? this.onEditableHandler : this.onSubmit;

        return (
            <Paper component="form" className="item-add-form__wrap"
                onSubmit={isSubmitable ? changeSubmit : this.nonSubmit}>
                <FormControl className={classes.formControl}>
                    <Input
                        error={isError}
                        className={classes.input}
                        placeholder="Enter new task"
                        label="Enter new task"
                        inputProps={{ 'aria-label': 'Enter new task' }}
                        onChange={this.onLabelChange}
                        value={label}
                        helpertext="Incorrect entry."
                    />

                    {isError && (
                        <Formhelpertext id="standard-weight-helper-text" className={classes.helpertext}>
                            Length is too short
                        </Formhelpertext>
                    )}
                </FormControl>
                <Button className='item-add-form'
                        startIcon={isEditable ? <SaveIcon/> : <QueueIcon/>}
                        onClick={isEditable ? this.onEditableHandler : this.onSubmit}
                        disabled={label.length < this.minInputLength}>
                        {isEditable ? 'Save' : 'Add Item'}
                </Button>
            </Paper>
        );
    }
};

export default withStyles(useStyles)(ItemAddForm);
