import { IMatchedPart } from './matched_part.interface';
export interface IAudaPart {
    AUDA_DESCRIPTION: string;
    AUDA_GUID: string;
    AUDA_PART_ID: string;
    AUDA_PART_OE: string;
    CREATED_BY: string;
    CREATE_DATE: string;
    MATCHED: IMatchedPart[];
    OE_PRICE: number;
    PART_STATUS_ID: number;
    REQUEST_ID: string;
    STATUS: string;
    UPDATED_BY: string;
    UPDATED_DATE: string;
}
