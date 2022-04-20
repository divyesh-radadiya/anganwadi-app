import { Database } from '@ionic/storage';
import React from 'react';
import { Aww } from '../models/aww';
import { Child } from '../models/child';
import { Followup } from '../models/followup';

interface Context {
    isLoad:boolean;
    db:Database;
    isOn:boolean;
    curUser:Aww;
    
    updateJwt:(jwt:string)=>void;
    initData: () => void;
    
}

const UserContext = React.createContext<Context>({
    
  } as Context);
  
  export default UserContext;