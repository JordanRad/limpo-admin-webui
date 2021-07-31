import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import {FormControl,InputLabel,Input,FormHelperText, ListItemSecondaryAction} from '@material-ui/core'

import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import OrderRow from './OrderRow';
import NewServiceDialog from './NewItemDialog'

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  inl:{
      marginLeft:theme.spacing(2)
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function NewOrderDialog(props) {
    const {open,passData}=props
  const classes = useStyles();
  const [dOpen, setDOpen] = React.useState(open);
  const [data,setData]= React.useState({})
  const [orderItems,setOrderItems]=React.useState([])
  const [newServiceDialogOpen,setNewServiceDialogOpen]=React.useState(false)

  const handleClickOpen = () => {
    setDOpen(true);
  };

  const handleClose = async () => {
     
     passData(data)
    setDOpen(false);
  };
  const handleChange=(field,value)=>{
     
      setData({...data,[field]:value})
      //console.log(data)
  }
  const saveData=(datas)=>{
      
      console.log(data)
      let old=orderItems
      old.push(datas)
      setOrderItems([...old])
      setData({...data,orderItems:[...old]})
  }

  return (
    <div>
      <NewServiceDialog open={newServiceDialogOpen} setOpen={setNewServiceDialogOpen} saveData={saveData}/>
      <Dialog fullScreen open={dOpen} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
             Нова Поръчка
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Запиши
            </Button>
          </Toolbar>
        </AppBar>
        <form className={classes.root} noValidate autoComplete="off">
      
      <FormControl fullWidth>
        <InputLabel htmlFor="component-helper">Име на клиента</InputLabel>
        <Input
          id="component-helper"
          value={data.name}
          onChange={(e)=>handleChange('name',e.target.value)}
          aria-describedby="component-helper-text"
        />
        <FormHelperText id="component-helper-text"></FormHelperText>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel htmlFor="component-helper">Телефон</InputLabel>
        <Input
          id="component-helper"
          value={data.tel}
          onChange={(e)=>handleChange('tel',e.target.value)}
          aria-describedby="component-helper-text"
        />
        <FormHelperText id="component-helper-text">телефонът във формат 08******</FormHelperText>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel htmlFor="component-helper">Адрес за изпълнение поръчката</InputLabel>
        <Input
          id="component-helper"
          value={data.addr}
          onChange={(e)=>handleChange('addr',e.target.value)}
          aria-describedby="component-helper-text"
        />
        <FormHelperText id="component-helper-text"></FormHelperText>
      </FormControl>
      <FormControl className={classes.inl}>
      <IconButton color="primary" aria-label="add to shopping cart" onClick={()=>{
          setNewServiceDialogOpen(true)
      }}>
        <AddShoppingCartIcon />
      </IconButton>
      </FormControl>
      <Button variant="contained" color="primary">
  Добави услуга
</Button>

      <List>
      {orderItems.map((el,idx)=>{
          return(
            <ListItem button key={idx}>
            <ListItemText primary={el.serviceType.name} secondary ={`${el.serviceQty} x ${el.servicePrice} лв.`}/>
        </ListItem>
          )
      })}
      
          
      </List>
      
      
    </form>
      </Dialog>
    </div>
  );
}