import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles({
  todoListItemLabel: {
    flex: 1,
    fontSize: '1.25rem',
    margin: '0 1.25rem',
    lineHeight: '35px',
    overflow: 'hidden',
    userSelect: 'none',
    textDecorationLine: (props) =>
      props.labelDone === 'true'
        ? 'line-through'
        : 'none',
    fontWeight: (props) =>
      props.labelImportant === 'true'
        ? 'bold'
        : 'normal',
    color: (props) =>
      props.labelImportant === 'true'
        ? '#3f51b5'
        : 'inherit',
    cursor: (props) =>
      props.labelEditable === 'true'
        ? 'auto'
        : 'pointer',
  },
});