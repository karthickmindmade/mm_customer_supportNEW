import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { CounterContext } from '../contex/adminProvider';

export default function FormAlert(props) {
    const {testing,showvalue}=useContext(CounterContext)
    const [open, setOpen] = React.useState(true);

    return (
        <div className='form-alert'>
            <Box sx={{ width: '100%' }}>
                <Collapse in={testing}>
                    <Alert
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"                             
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ mb: 2 }}
                    >
                        {showvalue}
                    </Alert>
                </Collapse>
            </Box>
        </div>

    );
}