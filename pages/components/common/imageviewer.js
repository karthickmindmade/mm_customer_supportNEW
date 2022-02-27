import React,{ useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';

export default function Imageviewer(props) {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    
    return (
        <div>
            <div variant="outlined" onClick={handleClickOpen}>
                {props.imgdialogbutton}
            </div>
            <Dialog className="Imageviewer-main-body" open={open}>
                <div className='row'>
                    <div className='col close-btn-div'><Button className='close-btn' onClick={handleClose}><CloseIcon /></Button></div>
                </div>

                <div className="viewer-img-body">
                    {props.imgdialogbody}
                </div>
            </Dialog>
        </div>
    );
}