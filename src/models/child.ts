import { Followup } from "./followup";

  export class Child {
    sam_id!: string;
    name!: string;
    age!: number;
    gender!: string;
    address!: string;
    phone_no!: number;
    is_done!: boolean;
    next_date?: Date;
    next_followupid?: string;
    followups!: Followup[];

  }
  export class fChild {
    sam_id!: string;
    name!: string;
    age!: number;
    gender!: string;
    address!: string;
    phone_no!: number;
    is_done!: boolean;
    next_date?: Date;
    next_followupid?: string;
    followups!: Followup[];

  }