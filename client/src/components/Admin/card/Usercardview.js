import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import newone from './3.jpg';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: 10,
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {

  const {item}=props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} variant="contained" color="warning">PROFILE</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}  style={{}}>
        <img src={`/uploads/${item.image}`} style={{width: 100,height: 100,borderRadius: 10}}/>
        <div className="cardcont" style={{marginLeft: 110,marginTop: -120}}>
        <Typography id="modal-modal-title" variant="h5" component="h2" style={{color: 'blue'}}>{item.fname}</Typography>
          <Typography id="modal-modal-title" style={{color: 'blue'}}>Email:  {item.email}</Typography>
          <Typography id="modal-modal-title" style={{color: 'blue'}}>Qualification:  {item.quali}</Typography>
          <Typography id="modal-modal-title" style={{color: 'blue'}}>Skills:  {item.skill+" "}</Typography>
          <Typography id="modal-modal-title" style={{color: 'blue'}}>Company:  {item.org}</Typography>
          <Typography id="modal-modal-title" style={{color: 'blue'}}>Designation: {item.job} </Typography>
        </div>
         
        </Box>
      </Modal>
    </div>
  );
}
