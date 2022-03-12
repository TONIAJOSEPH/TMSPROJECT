import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { collapseClasses } from '@mui/material';
import './dialogue.css'


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
   
    
  const { newid,children, onClose, ...other } = props;
 
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs(props) {
   
    const {children,id,newid}=props;
    
   
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (event) => {
      const newid=event.target.id;
    
    setOpen(true);

  };
  const handleClose = () => {
    setOpen(false);
   
  };

  return (
    <div>
      <Button  variant="contained" color="success" onClick={handleClickOpen}>
        allocate
      </Button>
      <BootstrapDialog
     
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="sm"
        fullWidth

      >
        <BootstrapDialogTitle style={{backgroundColor:'black',color: 'white'}} id="customized-dialog-title" onClose={handleClose}>
          schedule form
        </BootstrapDialogTitle>
        <DialogContent sx={{ mb: 5 }} dividers>
        {children}
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
