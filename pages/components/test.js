import React, { useEffect, useState } from 'react';
import FormDialog from './common/dialogsform';


function Test() {
    
   
  

    return (
        <div>
        <FormDialog dialogtitle="button1" dialogbody={<h1>button1 opened</h1>}/>
        <FormDialog dialogtitle="button2"   dialogbody={<h1>button2 opened</h1>}/>
        </div>
    )
}

export default Test