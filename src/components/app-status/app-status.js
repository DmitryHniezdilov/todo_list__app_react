import React, {useContext} from 'react';
import { Context } from "../../context";
import Typography from '@material-ui/core/Typography';

const AppStatus = () => {
    const {state} = useContext(Context);

    const doneCount = state.todoData.filter((el) => el.done).length;
    const todoCount = state.todoData.length - doneCount;

    return (
        <Typography xs={3} md={2} variant="h6" component="h2" color="textSecondary">
            {todoCount} more to do, {doneCount} done
        </Typography>
    )
};

export default AppStatus;
