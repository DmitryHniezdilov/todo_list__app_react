import React from 'react';
import Typography from '@material-ui/core/Typography';
import './app-status.scss';

const AppStatus = ({ toDo, done }) => {
  return (
      <Typography item xs={3} md={2} variant="h6" component="h2" color="textSecondary">
        {toDo} more to do, {done} done
        </Typography>
  )
}

export default AppStatus;
