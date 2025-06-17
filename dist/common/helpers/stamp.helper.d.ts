import { Request } from 'express';
export declare class StampHelper {
    static setCreateStamp(request: Request): {
        created_date: Date;
        created_from: any;
        created_by: any;
        created_name: any;
    };
    static setUpdateStamp(request: Request): {
        modified_date: Date;
        modified_from: any;
        modified_by: any;
        modified_name: any;
    };
}
