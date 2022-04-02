import { Database } from '@ionic/storage';
import React from 'react';
import { Child } from '../models/child';
import { Followup } from '../models/followup';

interface Context {
    isLoad:boolean;
    db:Database;
    isOn:boolean;
    isSync:boolean;
    allChildren: Child[];
    searchChildren:Child[];
    selectedChild:Child;
    selectedFollowUp:Followup;

    updateJwt:(jwt:string)=>void;
    initContext: () => void;
    isChildSelect: (samId: string) => void;
    isFollowUpSelect: (followUpId: string) => void;
    search: (searchType : string,name?: string) => void;
    updateData:() => void;
    getOfflineData:() => void;
    updateOfflineData:() => void;
    updateSearchData:() => void;
    
}

const ChildernContext = React.createContext<Context>({
    
  } as Context);
  
  export default ChildernContext;