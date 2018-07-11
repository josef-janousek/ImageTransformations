import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    maxWidth: '99%',
    margin: 'auto',
    marginBottom: theme.spacing.unit,
  },
  image: {
    maxWidth: '99%',
  },
});

function SimpleImage(props) {
  const { classes, data } = props;

  return (
    <div className={classes.root}>
      {data ? <img src={data} className={classes.image}/> : <Typography component="p">No image available</Typography>}
    </div>
  );
}

SimpleImage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleImage);