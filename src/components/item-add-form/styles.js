import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles({
    formControl: {
        flex: 1,
        paddingLeft: '1.25rem',
    },
    input: {
        marginRight: '1.25rem',
    },
    helperText: {
        color: '#f44336',
    },
    itemAddFormWrap: {
        padding: '6px 4px',
        display: 'flex',
        flexFlow: 'column wrap',
        alignItems: 'center',
        '@media screen and (min-width: 600px)': {
            flexFlow: 'row wrap',
            alignItems: 'flex-start'
        }
    }
});
