import React from 'react';
import PropTypes from 'prop-types';
import {useStyles} from './styles';

function TodoListItemLabel(props) {
    const {labelDone, labelImportant, labelEditable, clickItemLabel, label, ...other} = props;
    const classes = useStyles(props);

    return (
        <span
            className={classes.todoListItemLabel}
            onClick={clickItemLabel}
            {...other}>
                {label}
        </span>
    );
}

TodoListItemLabel.propTypes = {
    labelDone: PropTypes.oneOf(['true', '']).isRequired,
    labelImportant: PropTypes.oneOf(['true', '']).isRequired,
    labelEditable: PropTypes.oneOf(['true', '']).isRequired,
    clickItemLabel: PropTypes.func,
    label: PropTypes.string
};

export default TodoListItemLabel;
