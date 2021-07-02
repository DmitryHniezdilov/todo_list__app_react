import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles({
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  formControl: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  todoListItem: {
    padding: '2px 4px',
    display: 'flex',
    flexFlow: 'column wrap',
    alignItems: 'center',
    boxSizing: 'border-box',
    '@media screen and (min-width: 600px)': {
      flexFlow: 'row nowrap',
      justifyContent: 'space-between'
    }
  },
});