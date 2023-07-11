import { request } from '../core/request';

type LedgerRequestBody= {
  requestBody: {
    title: string,
    amountInCents: number,
    mode: 'INCOME' | 'EXPENSE',
    categoryId: string | null,
  }
};

type PaginationOptions = {
  limit: number, 
  offset: number,
};

type LedgerUpdate= {
  id: number, 
  requestBody: {
    title: string,
    amountInCents: number,
    mode: 'INCOME' | 'EXPENSE',
    categoryId: string,
    id: string,
    createdAt: number,
  }  
}
/*
type LedgerResponseBodyGetData= {
  mode: 'INCOME' | 'EXPENSE',
    title: string,
    amountInCents: number,
    categoryId: string,
    createdAt: number,
    id: string,
    category: {
        name: string,
        id: string,
        color: string
    }
};
type LedgerResponseBody = {
    title: string,
    amountInCents: number,
    mode: 'INCOME' | 'EXPENSE',
    categoryId: string,
    id: string,
    createdAt: number
};

*/

export class LedgerService {
  /**
   * @returns any
   * @throws ApiError
   */

  static create({ requestBody }: LedgerRequestBody): Promise<any>  {
    return request({
      method: 'POST',
      path: `/ledger`,
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  

  /**
   * @returns any
   * @throws ApiError
   */
  static findAll({ offset, limit }: PaginationOptions): Promise<any> {
    return request({
      method: 'GET',
      path: `/ledger?limit=${limit}&offset=${offset}`,
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  static findOne({ id }: {id: string}): Promise<any> {
    return request({
      method: 'GET',
      path: `/ledger/${id}`,
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  static update({ id, requestBody }: LedgerUpdate): Promise<any> {
    return request({
      method: 'PATCH',
      path: `/ledger/${id}`,
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  static remove({ ids }: {ids: string[]}): Promise<any> {
    return ids.length === 1
      ? request({
          method: 'DELETE',
          path: `/ledger/${ids[0]}`,
        })
      : request({
          method: 'DELETE',
          path: `/ledger`,
          body: { ids },
        });
  }
  /**
   * @returns any
   * @throws ApiError
   */
  static findAllRecords(): Promise<any>  {
    return request({
      method: 'GET',
      path: `/ledger`,
    });
  }
}
