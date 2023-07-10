import { request } from '../core/request';

type LedgerRequestBody= {
  requestBody: {
    title: string,
    amountInCents: number,
    mode: 'INCOME' | 'EXPENSE',
    categoryId: string | null,
  }
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
};

type paginationOptions = {
  limit: number, 
  offset: number,
}

export class LedgerService {
  /**
   * @returns any
   * @throws ApiError
   */

  static create({ requestBody }: LedgerRequestBody)  {
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
  static findAll({ offset, limit }: paginationOptions) {
    return request({
      method: 'GET',
      path: `/ledger?limit=${limit}&offset=${offset}`,
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  static findOne({ id }: {id: string}) {
    return request({
      method: 'GET',
      path: `/ledger/${id}`,
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  static update({ id, requestBody }: LedgerUpdate): Promise<void> {
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
  static remove({ ids }: {ids: string[]}): Promise<void> {
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
  static findAllRecords()  {
    return request({
      method: 'GET',
      path: `/ledger`,
    });
  }
}
