import { Database } from '@ionic/storage';
import React from 'react';
import { Child } from '../models/child';
import { Followup } from '../models/followup';

interface Context {
    isLoad:number;
    db:Database;
    isOn:boolean;
    curFollowUp:Followup;

    onSubmit: (subFollowup: Followup,subChild:Child) => void;
    // allChildren: Child[];
    // searchChildren:Child[];
    // selectedChild:Child;
    // selectedFollowUp:Followup;

    // initContext: () => void;
    // isChildSelect: (samId: string) => void;
    // isFollowUpSelect: (followUpId: string) => void;
    // search: (name?: string) => void;
    // updateData:() => void;
    // getOfflineData:() => void;
    // updateOfflineData:() => void;
    // updateSearchData:() => void;
    
}

const FollowupContext = React.createContext<Context>({
    
  } as Context);
  
  export default FollowupContext;