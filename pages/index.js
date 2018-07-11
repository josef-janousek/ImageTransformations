/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import SimpleImage from '../components/SimpleImage';
import SimpleTable from '../components/SimpleTable';

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 190,
  },
  menu: {
    width: 190,
  },
  button: {
    marginBottom: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class Index extends React.Component {
  state = {
    operations: [],
    newOpName: "resize",
    newOpParameter: 128,
    originalFile: null,
    newFile: null,
  };

  definedOps = [{id: 0, name: "resize"}, {id: 1, name: "quality"}];

  addOperation = () => {
    var numberParam = Number(this.state.newOpParameter);
    if (isNaN(numberParam) || numberParam <= 0) {
      alert("Operation parameter must be a positive number.");
      return;
    }
    this.state.operations.push({
      id: this.state.operations.length,
      name: this.state.newOpName,
      parameter: numberParam,
    });
    this.setState({
      operations: this.state.operations,
    });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleFileChange = event => {
    this.setState({
      originalFile: URL.createObjectURL(event.target.files[0]),
    })
  };

  handleTransform = () => {
    if (this.state.operations.length == 0) { alert("Transformations pipeline is empty."); return; }
    if (this.state.originalFile == null) { alert("Original image is not set."); return; }

    var image = Jimp.read(this.state.originalFile);

    this.state.operations.forEach(op => {
      image.then(img => {
        switch (op.name) {
          case "resize":
            img.resize(op.parameter, Jimp.AUTO);
            break;
          case "quality":
            img.quality(op.parameter);
            break;
        }
      }).catch(err => {
        console.error(err);
      });
    });

    image.then(img => {
      img.getBase64(Jimp.AUTO, (err, src) => {
        this.setState({
          newFile: src,
        });
      });
    }).catch(err => {
      console.error(err);
    });
  };

  render() {
    const { classes } = this.props;
    const { operations, newOpName, newOpParameter, originalFile, newFile } = this.state;

    return (
      <div className={classes.root}>
        <Typography variant="display1" gutterBottom>
          Image transformations
        </Typography>

        <Typography variant="subheading" gutterBottom>
          New transformation:
        </Typography>

        <TextField
          id="select-operation"
          select
          label="Operation type:"
          className={classes.textField}
          value={newOpName}
          onChange={this.handleChange('newOpName')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          margin="normal"
        >
          {this.definedOps.map(option => (
            <MenuItem key={option.name} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          id="parameter"
          required
          label="Parameter (number):"
          value={newOpParameter}
          onChange={this.handleChange('newOpParameter')}
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />

        <Button variant="contained" color="primary" onClick={this.addOperation} className={classes.button}>
          Add
        </Button>

        <Typography variant="subheading" gutterBottom>
          Transformations pipeline:
        </Typography>

        <SimpleTable data={operations}/>

        <Typography variant="subheading" gutterBottom>
          Original image:
        </Typography>

        <input
          accept="image/*"
          className={classes.input}
          id="outlined-button-file"
          type="file"
          onChange={this.handleFileChange}
        />
        <label htmlFor="outlined-button-file">
          <Button variant="outlined" component="span" className={classes.button}>
            Upload
          </Button>
        </label>

        <SimpleImage data={originalFile}/>

        <Button variant="contained" color="secondary" className={classes.button} onClick={this.handleTransform}>
          Transform image
        </Button>

        <Typography variant="subheading" gutterBottom>
          New image:
        </Typography>

        <SimpleImage data={newFile}/>
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Index);
