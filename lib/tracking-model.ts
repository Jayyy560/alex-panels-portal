import type {Config,Delivery} from './model';
export const statuses=['Pending','Packed','Dispatched','In transit','Delivered'] as const;
export const kinds=['Distributor','Dealer','Sales team'] as const;
export type TeamUser={id:string;username:string;name:string;kind:string;email:string;phone:string;active:number;created:string;password_available?:number};
export type Allocation={id:string;user_id:string;gift_id:string;gift_name:string;gift_group:string;campaign:string;quantity:number;distributed:number;status:string;vehicle:string;eta:string;notes:string;created:string;version:number;user_name:string;user_kind:string};
export type Distribution={id:string;allocation_id:string;user_id:string;name:string;phone:string;category:string;quantity:number;photo_key:string;created:string;gift_name:string;campaign:string;user_name:string;gift_group:string};
export type TrackingData={isAdmin:boolean;me:TeamUser|null;users:TeamUser[];allocations:Allocation[];distributions:Distribution[];config:Config;version:number;customerCategories:string[];categoryVersion:number;legacyCount:number;legacyRecords:Delivery[]};
export const defaultCategories=['Architect','Dealer','Distributor','Carpenter','Fabricator','Other'];
