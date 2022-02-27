import React from 'react';
import { Typography } from '@mui/material';
export default function Dashcard(props) {

    return (
        <div className='col card-1' onClick={props.onClick} >
            <div className='card-left'>
            <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
          >
           {props.cardHead}
          </Typography>
                <Typography
                    color="textPrimary"
                    variant="h4"
                >
                    {props.cardbody}
                </Typography>
                <div className='ticket-no'>

                </div>
                <div className='lastlticket'>
                    {props.cardfooter}
                </div>
            </div>
            <div className='card-right'>
                <div className='card-logo'>
                    {props.cardIcon}
                </div>
            </div>
        </div>
    )
}