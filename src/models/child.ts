import { Followup } from "./followup";

  export class Child {
    samId!: string;
    name!: string;
    age!: number;
    gender!: string;
    address!: string;
    contactNumber!: number;
    isDone!: boolean;
    nextDate?: Date;
    nextFollowupid?: string;
    followUps!: Followup[];
    currWeight?: Number;
    currGrowthStatus?: string;

  }
 