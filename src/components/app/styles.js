import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles({
  root: {
    height: '100vh',
  },
  item: {
    maxWidth: '470px',
  },
  card: {
    height: '100%',
    width: '100%',
  },
  appTopWrap: {
    display: 'flex',
    flexFlow: 'column wrap',
    alignItems: 'center',
    '@media screen and (min-width: 600px)': {
      flexFlow: 'row wrap',
      alignItems: 'flex-end',
      justifyContent: 'space-between'
    }
  }
});