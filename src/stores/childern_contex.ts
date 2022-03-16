import React from 'react';
import { Child } from '../models/child';
import { Followup } from '../models/followup';

interface Context {
    allChildren: Child[];
    searchChildren:Child[];
    selectedChild:Child;
    selectedFollowUp:Followup;

    isChildSelect: (samId: string) => void;
    isFollowUpSelect: (followUpId: string) => void;
    search: (name?: string) => void;
    updateData:() => void;
    updateSearchData:() => void;
    
}

const ChildernContext = React.createContext<Context>({
    
  } as Context);
  
  export default ChildernContext;