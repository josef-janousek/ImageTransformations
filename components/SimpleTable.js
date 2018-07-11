import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    maxWidth: 350,
    margin: 'auto',
    marginBottom: theme.spacing.unit * 2,
    overflowX: 'auto',
  },
  table: {
    maxWidth: 350,
  },
});

function SimpleTable(props) {
  const { classes, data } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Operation</TableCell>
            <TableCell numeric>Parameter</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(op => {
            return (
              <TableRow key={op.id}>
                <TableCell component="th" scope="row">
                  {op.name}
                </TableCell>
                <TableCell numeric>{op.parameter}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);
