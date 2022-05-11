import { Database } from '@ionic/storage';
import React from 'react';
import { Child } from '../models/child';
import { Followup } from '../models/followup';

interface Context {
    isLoad:boolean;
    db:Database;
    isOn:boolean;
    isSync:number;
    isSession:boolean;
    allChildren: Child[];
    completedChildren:Child[];
    todayChildren:Child[];
    lateChildren:Child[];
    veryLateChildren:Child[];
    upcomingChildren:Child[];
    syncFollowup:Followup[];
    selectedChild:Child;
    selectedFollowUp:Followup;

    updateJwt:(jwt:string)=>void;
    initContext: () => void;
    isChildSelect: (samId: string) => void;
    isFollowUpSelect: (followUpId: string) => void;
    updateData:() => void;
    updateSyncFollowup:() => void;
    getOfflineData:() => void;
    updateOfflineData:() => void;
    
}

const ChildernContext = React.createContext<Context>({
    
  } as Context);
  
  export default ChildernContext;