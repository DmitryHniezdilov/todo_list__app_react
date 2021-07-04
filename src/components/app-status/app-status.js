import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const AppStatus = ({toDo, done}) => {
    return (
        <Typography xs={3} md={2} variant="h6" component="h2" color="textSecondary">
            {toDo} more to do, {done} done
        </Typography>
    )
}

AppStatus.propTypes = {
    toDo: PropTypes.number,
    done: PropTypes.number
};

export default AppStatus;
