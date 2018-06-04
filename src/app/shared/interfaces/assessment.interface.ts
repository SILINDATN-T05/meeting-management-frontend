import { IAuthorizationPart } from './authorization_part.interface';
import { IComment } from './comments.interface';

export interface IAssessment {
    MBR_NAME: string;
    TELEPHONE: string;
    EMAIL: string;
    PARTS: IAuthorizationPart[];
    REQUEST_ID: string;
    MESSAGE_ID: string;
    PROCESSED_BY: string;
    CSC: string;
    ASSESSMENT_ID: string;
    MAJOR_STATUS_ID: number;
    MINOR_STATUS_ID: [number];
    AUDA_VEHICLE_ID: string;
    VIN: string;
    REGISTRATION: string;
    ORIGINATOR: string;
    WORKPROVIDER_ID: string;
    CLAIM_NO: string;
    POLICY_NO: string;
    MBR_ID: string;
    REPAIR_START: string;
    REPAIR_END: string;
    UNDER_WARRANTY: string;
    WARRANTY_EXPIRE: string;
    OUTLET_ID: string;
    STATUS: string;
    CREATE_DATE: string;
    UPDATED_DATE: string;
    CREATED_BY: string;
    UPDATED_BY: string;
    WORKPROVIDER_ABBR: string;
    COMMENTS: IComment[];
}
