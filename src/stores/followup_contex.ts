import { Database } from '@ionic/storage';
import React from 'react';
import { Child } from '../models/child';
import { Followup } from '../models/followup';

interface Context {
    isLoad:number;
    db:Database;
    isOn:boolean;
    curFollowUp:Followup;
    updateJwt:(jwt:string)=>void;
    onSubmit: (subFollowup: Followup,subChild:Child) => void;
    
}

const FollowupContext = React.createContext<Context>({
    
  } as Context);
  
  export default FollowupContext;