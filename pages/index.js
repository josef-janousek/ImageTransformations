/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import SimpleTable from '../components/SimpleTable';

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit,
  },
});

class Index extends React.Component {
  state = {
    operations: [{id: 0, name: "resize", parameter: 128}, {id: 1, name: "quality", parameter: 60}],
  };

  render() {
    const { classes } = this.props;
    const { operations } = this.state;

    return (
      <div className={classes.root}>
        <Typography variant="display1" gutterBottom>
          Image transformations
        </Typography>

        <Typography variant="subheading" gutterBottom>
          Transformations pipeline:
        </Typography>

        <SimpleTable data={operations}/>
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Index);
