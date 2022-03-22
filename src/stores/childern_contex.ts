import { Database } from '@ionic/storage';
import React from 'react';
import { Child } from '../models/child';
import { Followup } from '../models/followup';

interface Context {
    isLoad:boolean;
    db:Database;
    isOn:boolean;
    allChildren: Child[];
    searchChildren:Child[];
    selectedChild:Child;
    selectedFollowUp:Followup;

    initContext: () => void;
    isChildSelect: (samId: string) => void;
    isFollowUpSelect: (followUpId: string) => void;
    search: (name?: string) => void;
    updateData:() => void;
    getOfflineData:() => void;
    updateOfflineData:() => void;
    updateSearchData:() => void;
    
}

const ChildernContext = React.createContext<Context>({
    
  } as Context);
  
  export default ChildernContext;