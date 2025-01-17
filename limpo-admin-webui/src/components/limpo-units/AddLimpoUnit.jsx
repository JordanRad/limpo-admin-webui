import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles, FormControl, FormHelperText } from '@material-ui/core'
import { Redirect, useHistory } from 'react-router-dom';
import OrderService from '../../services/OrderService';


const useStyles = makeStyles((theme) => ({

  root: {
    padding: theme.spacing(5),
    "& .MuiFormLabel-root.Mui-focused": {
      borderColor: theme.palette.primary.dark,
      color: theme.palette.primary.dark
    },
    "& .MuiInput-underline:after": {
      borderColor: theme.palette.primary.dark,
    }
  },
  input: {
    marginBottom: theme.spacing(3)
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
  },
  error: {
    backgroundColor: theme.palette.error.main,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.error.light,
      borderColor: theme.palette.error.main,
      color: "black",
    },
    textAlign: "center",
  },
  save: {
    backgroundColor: theme.palette.primary.dark,
    color: "white",
    "&:hover": {
      borderColor: theme.palette.primary.dark,
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.dark,
    },
    textAlign: "center",
  },
}));

export default function AddLimpoUnit(props) {
  const { open } = props
  const [hasToRedirect, setHasToRedirect] = useState(false)

  const [limpoUnitName, setLimpoUnitName] = useState('')
  const [LimpoUnitDescription, setLimpoUnitDescription] = useState('')
  const [helpers, setHelpers] = useState({ name: "" })
  const [dialogOpen, setDialogOpen] = useState(open)


  const classes = useStyles();

  const history = useHistory();

  const saveData = async (data) => {
    let response = await OrderService.post("/limpoUnits/", data)
    
    if(response === undefined){
      alert("Услуга с това име вече съществува!\nМоля, изберете друго име за услугата.")
    }else{
      history.push("./limpoUnits")
    }

  }
  const handleClose = () => {
    setLimpoUnitName('')
    setLimpoUnitDescription(" ")
    setDialogOpen(false);
    setHasToRedirect(true);
    history.push("./limpoUnits")
  };

  const handleSave = () => {
    if (limpoUnitName === '') {
      helpers.name = "Името e задължително"
      setHelpers({ ...helpers })
    }

    if (helpers.name === "") {
      saveData({ name: limpoUnitName, description: LimpoUnitDescription })
    }
  }


  if (hasToRedirect) {
    return <Redirect to='/dashboard' />
  } else {
    return (
      <div>
        <Dialog disableBackdropClick className={classes.root} open={dialogOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Нова услуга</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Моля въведете име и описание на новата услуга
            </DialogContentText>
            <div>
              <FormControl className={classes.input} fullWidth >
                <TextField
                  label="Име на услугата"
                  error={helpers.name !== ""}
                  helperText={helpers.name}
                  id="component-helper"
                  value={limpoUnitName || ""}
                  onChange={(e) => (setLimpoUnitName(e.target.value))}
                  aria-describedby="component-helper-text"
                  type="text"
                  autoComplete="off"
                />
                <FormHelperText id="component-helper-text"></FormHelperText>
              </FormControl>
              <FormControl className={classes.input} fullWidth>
                <TextField
                  fullWidth
                  id="standard-multiline-flexible"
                  label="Описание"
                  multiline
                  maxRows={3}
                  value={LimpoUnitDescription || ""}
                  onChange={(e) => (setLimpoUnitDescription(e.target.value))}
                />
              </FormControl>
            </div>
          </DialogContent>
          <DialogActions className={classes.actions}>
            <Button className={classes.save} variant="outlined" onClick={handleSave} color="primary">
              Запиши
            </Button>
            <Button className={classes.error} variant="outlined" onClick={handleClose} color="primary">
              Откажи
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
