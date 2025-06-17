import { Request } from 'express';

export class StampHelper {
  static setCreateStamp(request: Request) {
    const entity = {
      created_date: new Date(),
      created_from:
        request.body.source || request.get('User-Agent') || request.ip,
      created_by: request.body.userId,
      created_name: request.body.userName,
    };

    return entity;
  }

  static setUpdateStamp(request: Request) {
    const entity = {
      modified_date: new Date(),
      modified_from:
        request.body.source || request.get('User-Agent') || request.ip,
      modified_by: request.body.userId,
      modified_name: request.body.userName,
    };

    return entity;
  }
}
