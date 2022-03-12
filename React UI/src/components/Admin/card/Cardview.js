import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './cardview.css';
import newone from './3.jpg';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {

    const {item} = props;
    console.log(item.starttime);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} variant="contained" color="warning">CARDVIEW</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         <img className="cardimg" style={{width: 100,height: 100}} src={newone}/>
          <div className="cardcontent">
          <Typography className="cardname" id="modal-modal-title" variant="h5" component="h2" style={{color: "black",marginTop: -20,marginLeft: 10}}>{item.fname}</Typography>
          <Typography id="modal-modal-title" style={{color: "black",backgroundColor: "lightgrey",padding: 5,marginBottom: 5}}>Batch: {item.batch}</Typography>
          <Typography id="modal-modal-title" style={{color: "black",backgroundColor: "lightgrey",padding: 5,marginBottom: 5}}>Day: {item.day}</Typography>
          <Typography id="modal-modal-title" style={{color: "black",backgroundColor: "lightgrey",padding: 5,marginBottom: 5}}>StartTime: {item.starttime}</Typography>
          <Typography id="modal-modal-title" style={{color: "black",backgroundColor: "lightgrey",padding: 5,marginBottom: 5}}>EndTime: {item.endtime}</Typography>
          <Typography id="modal-modal-title" style={{color: "black",backgroundColor: "lightgrey",padding: 5,marginBottom: 5}}>Startdate: {item.startdate}</Typography>
          <Typography id="modal-modal-title" style={{color: "black",backgroundColor: "lightgrey",padding: 5,marginBottom: 5}}>Enddate: {item.enddate}</Typography>
          <Typography id="modal-modal-title" style={{color: "black",backgroundColor: "lightgrey",padding: 5,marginBottom: 5}}>Meetinglink: {item.meeting}</Typography>
          <Typography id="modal-modal-title" style={{color: "black",backgroundColor: "lightgrey",padding: 5,marginBottom: 5}}>Schedulelink: {item.schedule}</Typography>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
