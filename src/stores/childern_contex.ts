import React from 'react';
import { Child } from '../models/child';
import { Followup } from '../models/followup';

interface Context {
    allChildren: Child[];
    selectedChild:Child;
    selectedFollowUp:Followup;

    isChildSelect: (samId: string) => void;
    isFollowUpSelect: (followUpId: string) => void;
    
}

const ChildernContext = React.createContext<Context>({
    // allChildren: [],
    // selectedChild: undefined,
    // isSelect: () => {},
  } as Context);
  
  export default ChildernContext;